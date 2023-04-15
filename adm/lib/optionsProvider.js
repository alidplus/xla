import React, {useEffect, useMemo, useState} from "react";
import pick from "lodash/pick";
import { useDispatch, useSelector } from "react-redux";
import Id from 'components/Id'
import ducks from "store/services";
import debounce from "lodash/debounce";

const _hardQuery = {}

export const simpleQuery = kwd => ({ _id: kwd })

export default function optionsProvider(serviceName, queryBuilder = simpleQuery, inline = Id, hardQuery = _hardQuery, id = null) {
  const uid = `${serviceName}-hook-adapter`
  const page = useSelector(state => ducks[serviceName].selectors.find(state, { uid }));
  const single = useSelector(state => ducks[serviceName].selectors.get(state, { id }));
  const dispatch = useDispatch();
  const find = (uid, query) => dispatch(ducks[serviceName].creators.find(uid, query))
  const get = (uid, query) => dispatch(ducks[serviceName].creators.find(uid, query))

  const [filters, setFilters] = useState({})

  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = filters
    const query = { ...hardQuery, $skip, $limit }
    if (keyword) query.$search = keyword
    find(uid, query)
  }, [filters])

  useEffect(() => {
    if (id && (!single || single._id !== id))
      get(id)
  }, [id])

  return useMemo(() => {
    const Inline = inline

    const searchProps = {
      defaultValue: filters.keyword,
      onChange: debounce((e) => {
        const v = typeof e === 'string' ? e : e.target.value
        setFilters(prevState => ({...prevState, keyword: v}))
        return v
      }, 500)
    }

    const paginateProps = {
      ...pick(page, ['skip', 'total', 'limit']),
      onChange: (skip) => {
        setFilters(prevState => ({ ...prevState, skip }))
      }
    }

    const options = page.data.map(d => ({_id: d._id, label: <Inline type={serviceName} data={d}/> }))

    const selected = (id && single) ? { _id: single._id, label: <Inline type={serviceName} data={single}/> } : null

    return { options, searchProps, paginateProps, selected };
  }, [page, single])
}

export const arrayProvider = (allOptions) => (q = null, id = null) => {
  const [filters, setFilters] = useState({})

  return useMemo(() => {
    const { keyword = '', skip: $skip = 0, limit: $limit = 10 } = filters

    const searchProps = {
      defaultValue: filters.keyword,
      onChange: (e) => {
        const v = typeof e === 'string' ? e : e.target.value
        setFilters(prevState => ({...prevState, keyword: v}))
        return v
      }
    }

    const paginateProps = {
      className: "d-none",
      total: 0,
      skip: 0,
      limit: 0
    }

    const options = allOptions.filter(opt => !keyword || opt.label.includes(keyword))//.slice(skip, skip + limit)

    const selected = allOptions.find(opt => opt._id === id)

    return { options, searchProps, paginateProps, selected };
  }, [allOptions, id])
}

export const nullProvider = () => {
  return useMemo(() => {
    return { options: [], searchProps: { placeholder: 'NullAdapter' }, paginateProps: {}, selected: null };
  }, [])
}
