import React, { useEffect, useState } from 'react'

import { fsDuck } from 'store/services'
import withUID from 'lib/withUID'
import { connect } from 'react-redux';
import Table from 'src/fs/screens/Table'
import { useRouter } from 'next/router'
import {Button} from "../../../atoms";
import {Edit, Plus} from "atoms/icons";
import {useHash} from "layout/HashRoutes";

function List ({ uid, find, requestFind }) {
  const hash = useHash()
  const router = useRouter()
  const setFilters = filters => {
    router.push({ pathname: router.pathname, query: filters }, undefined, { shallow: true })
  }
  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = router.query
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
  }, [router.query])
  return (
    <div>
      <h4 className="float-start">Fs Table</h4>
      {/*<Button className="float-end mb-2" size="sm" onClick={e => hash.push('/fs/add/new')}><Plus/> Add Fs</Button>*/}
      {find && <Table find={find} filters={router.query} onChange={setFilters}/>}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { uid } = props
  return {
    find: fsDuck.selectors.find(state, { uid })
  }
}
const mapActionsToProps = {
  requestFind: fsDuck.creators.find
}

export default withUID(connect(mapStateToProps, mapActionsToProps)(List), 'admin-fs')
