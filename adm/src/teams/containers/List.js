import React, { useEffect, useState } from 'react'

import { teamsDuck } from 'store/services'
import withUID from 'lib/withUID'
import { connect } from 'react-redux';
import Table from 'src/teams/screens/Table'
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
      // let rgx = keyword.split(' ').filter(a => a).join('|');
      query['$or'] = [
        {_id: keyword},
        {teamname: keyword},
        {email: keyword},
        // {teamname: {$regex: rgx, $options: 'ig'}},
        // {email: {$regex: rgx, $options: 'ig'}}
      ];
    }
    requestFind(uid, query)
  }, [router.query])
  return (
    <div>
      <h4 className="float-start">Teams Table</h4>
      <Button className="float-end mb-2" size="sm" onClick={e => hash.push('/team/add/new')}><Plus/> Add Team</Button>
      {find && <Table find={find} filters={router.query} onChange={setFilters}/>}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { uid } = props
  return {
    find: teamsDuck.selectors.find(state, { uid })
  }
}
const mapActionsToProps = {
  requestFind: teamsDuck.creators.find
}

export default withUID(connect(mapStateToProps, mapActionsToProps)(List), 'admin-teams')
