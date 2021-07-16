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

const playersMap = [
  {
    title: 'ID',
    render: data => (<Id type="player" data={data}/>),
  },
  {
    title: '#',
    key: 'no',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'date',
    propName: 'data',
    Component: FormattedDate,
  },
  {
    title: 'Actions',
    className: 'text-center',
    render: (data) => (<TableActions route="players" data={data}><div>ssssss</div></TableActions>),
  }
]

function PlayerTable ({ page = {}, filters = {}, onChange }) {
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
      <h4 className="float-start">Players Table</h4>
      <Button className="float-end mb-2" size="sm" onClick={e => hash.push('/players/add/new')}><Plus/> Add Player</Button>
      <TableSearch keyword={filters.keyword} onSubmit={handleSearch}/>
      <Table
        data={page?.data ?? []}
        skip={page.skip}
        map={playersMap}
      />
      <Pagination {...paginateProps} onChange={handlePaginate}/>
    </div>
  )
}

PlayerTable.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
  page: PropTypes.object
}

PlayerTable.defaultProps = {
  onChange: () => ({}),
  filters: {},
  page: { data: [], total: 0, skip: 0, limit: 0 }
}

export default PlayerTable
