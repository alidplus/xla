import React, { useEffect, useState, useMemo } from 'react'
import { fsDuck } from 'store/services'
import withUID from 'lib/withUID'
import { connect } from 'react-redux';
import omit from "lodash/omit";

function Adapter ({ id, uid, get, find, requestFind, requestGet, children }) {
  const [filters, setFilters] = useState({})
  useEffect (() => {
    if (id)
      requestGet(id)
  }, [id])
  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = filters
    const query = { $skip, $limit }
    if (keyword) {
      let rgx = keyword.split(' ').filter(a => a).join('|');
      query['$or'] = [
        {name: {$regex: rgx, $options: 'ig'}},
        {email: {$regex: rgx, $options: 'ig'}},
        {mobile: {$regex: rgx, $options: 'ig'}}
      ];
    }
    requestFind(uid, query)
  }, [filters])
  const searchProps = {
    defaultValue: filters.keyword,
    onChange: (e) => setFilters(prevState => ({...prevState, keyword: e.target.value}))
  }
  const paginateProps = {
    ...omit(find, ['data']),
    onChange: (e) => {
      console.log('on change paginate value inside adapter')
    }
  }
  const options = useMemo(() => {
    return find.data.map(d => ({_id: d._id, label: d.email }))
  }, [find.data])
  const selected = useMemo(() => {
    if (!get) return null
    return { _id: get._id, label: get.email }
  }, [get])
  return children(options, searchProps, paginateProps, selected)
}

const mapStateToProps = (state, props) => {
  const { id, uid } = props
  return {
    get: fsDuck.selectors.get(state, { id }),
    find: fsDuck.selectors.find(state, { uid })
  }
}

const mapActionsToProps = {
  requestGet: fsDuck.creators.get,
  requestFind: fsDuck.creators.find
}

export default withUID(connect(mapStateToProps, mapActionsToProps)(Adapter), 'adapter-fs')
