import React, { useState } from 'react'
import Table from 'components/Table'
import TableActions from 'components/TableActions'
import Pagination from 'components/Pagination'
import TableSearch from 'components/TableSearch'
import {FormGroup} from "../../atoms";
import PropTypes from "prop-types";

const usersMap = [
  {
    title: 'ID',
    key: '_id',
  },
  {
    title: 'Username',
    key: 'username',
  },
  {
    title: 'Actions',
    propName: 'data',
    className: 'text-center',
    Component: TableActions,
  }
]

function UserTable ({ find = {}, filters = {}, onChange }) {
  const handleSearch = e => {
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value
    onChange(Object.assign({}, filters, { keyword }))
  }
  const handlePaginate = skip => {
    onChange(Object.assign({}, filters, { skip }))
  }
  return (
    <>
      <TableSearch onSubmit={handleSearch}/>
      <Table
        data={find.data}
        map={usersMap}
      />
      <Pagination {...find} onChange={handlePaginate}/>
    </>
  )
}

export default UserTable

UserTable.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object,
  find: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number,
    skip: PropTypes.number,
    limit: PropTypes.number
  }))
}

UserTable.defaultProps = {
  filters: {},
  find: { data: [], total: 0, skip: 0, limit: 0 }
}
