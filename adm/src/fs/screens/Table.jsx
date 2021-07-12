import React, { useState } from 'react'
import Card from './Card'
import { Row, Col } from 'atoms'
import TableActions from 'components/TableActions'
import Pagination from 'components/Pagination'
import TableSearch from 'components/TableSearch'
import Id from 'components/Id'
import PropTypes from "prop-types";
import FormattedDate from "components/FormattedDate";

const fsMap = [
  {
    title: 'ID',
    render: data => (<Id type="fs" data={data}/>),
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'date',
    propName: 'data',
    Component: FormattedDate,
  },
  {
    title: 'Actions',
    className: 'text-center',
    render: (data) => (<TableActions route="fs" data={data}><div>ssssss</div></TableActions>),
  }
]

function FsTable ({ find = {}, filters = {}, onChange }) {
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
      <TableSearch keyword={filters.keyword} onSubmit={handleSearch}/>
      <Row className="row-cols-3 mt-3">
        {find.data.map(fs => {
          return <Col key={fs._id}>
            <Card data={fs} />
          </Col>
        })}
      </Row>
      <Pagination {...find} onChange={handlePaginate}/>
    </>
  )
}

export default FsTable

FsTable.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.object,
  find: PropTypes.object/*Of(PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number,
    skip: PropTypes.number,
    limit: PropTypes.number
  }))*/
}

FsTable.defaultProps = {
  filters: {},
  find: { data: [], total: 0, skip: 0, limit: 0 }
}
