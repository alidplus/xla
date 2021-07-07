import React, { useState } from 'react'
import Table from 'components/Table'
import TableActions from 'components/TableActions'
import Pagination from 'components/Pagination'
import TableSearch from 'components/TableSearch'
import Id from 'components/Id'
import PropTypes from "prop-types";

const teamsMap = [
  {
    title: 'ID',
    render: data => (<Id type="team" data={data}/>),
  },
  {
    title: 'Title',
    key: 'title.fa',
  },
  {
    title: 'Actions',
    propName: 'data',
    className: 'text-center',
    Component: TableActions,
  }
]

function TeamTable ({ find = {}, filters = {}, onChange }) {
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
        map={teamsMap}
      />
      <Pagination {...find} onChange={handlePaginate}/>
    </>
  )
}

export default TeamTable

TeamTable.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object,
  find: PropTypes.object/*Of(PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number,
    skip: PropTypes.number,
    limit: PropTypes.number
  }))*/
}

TeamTable.defaultProps = {
  filters: {},
  find: { data: [], total: 0, skip: 0, limit: 0 }
}
