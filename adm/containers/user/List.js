import React, { useEffect, useState } from 'react'

import ducks from 'store/services'
import withUID from 'lib/withUID'
import { connect } from 'react-redux';
import Table from 'screens/user/Table'
import { useRouter } from 'next/router'
import {Button} from "../../atoms";
import {Edit, Plus} from "atoms/icons";
import {useHash} from "layout/HashRoutes";

function List ({ uid, find, requestFind }) {
  const hash = useHash()
  const router = useRouter()
  const setFilters = filters => {
    console.log(router.pathname)
    router.push({ pathname: router.pathname, query: filters }, undefined, { shallow: true })
  }
  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = router.query
    const query = { $skip, $limit }
    if (keyword) {
      // let rgx = keyword.split(' ').filter(a => a).join('|');
      query['$or'] = [
        {_id: keyword},
        {username: keyword},
        {email: keyword},
        // {username: {$regex: rgx, $options: 'ig'}},
        // {email: {$regex: rgx, $options: 'ig'}}
      ];
    }
    requestFind(uid, query)
  }, [router.query])
  return (
    <div>
      <h4 className="float-start">Users Table</h4>
      <Button className="float-end mb-2" size="sm" onClick={e => hash.push('/user/add/new')}><Plus/> Add User</Button>
      {find && <Table find={find} filters={router.query} onChange={setFilters}/>}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { uid } = props
  return {
    find: ducks.users.selectors.find(state, { uid })
  }
}
const mapActionsToProps = {
  requestFind: ducks.users.creators.find
}

export default withUID(connect(mapStateToProps, mapActionsToProps)(List), 'admin-users')
