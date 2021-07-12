import React, { useMemo } from 'react'
import pick from 'lodash/pick'
import Table from 'components/Table'
import TableActions from 'components/TableActions'
import Pagination from 'components/Pagination'
import TableSearch from 'components/TableSearch'
import Id from 'components/Id'
import PropTypes from "prop-types";
import FormattedDate from "components/FormattedDate";
import {Button} from "../../../atoms";
import {Plus} from "../../../atoms/icons";
import { useHash } from 'layout/HashRoutes'

const eventsMap = [
  {
    title: 'ID',
    render: data => (<Id type="event" data={data}/>),
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
    render: (data) => (<TableActions route="events" data={data}><div>ssssss</div></TableActions>),
  }
]

function EventTable ({ page = {}, filters = {}, onChange }) {
  const hash = useHash()
  const handleSearch = e => {
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value
    onChange(Object.assign({}, filters, { keyword }))
  }
  const handlePaginate = skip => {
    onChange(Object.assign({}, filters, { skip }))
  }
  const paginateProps = useMemo(() => pick(page, ['total', 'skip', 'limit', 'loading']), [page])
  return (
    <div>
      <h4 className="float-start">Events Table</h4>
      <Button className="float-end mb-2" size="sm" onClick={e => hash.push('/events/add/new')}><Plus/> Add Event</Button>
      <TableSearch keyword={filters.keyword} onSubmit={handleSearch}/>
      <Table
        data={page?.data ?? []}
        skip={page.skip}
        map={eventsMap}
      />
      <Pagination {...paginateProps} onChange={handlePaginate}/>
    </div>
  )
}

EventTable.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
  page: PropTypes.object
}

EventTable.defaultProps = {
  onChange: () => ({}),
  filters: {},
  page: { data: [], total: 0, skip: 0, limit: 0 }
}

export default EventTable
