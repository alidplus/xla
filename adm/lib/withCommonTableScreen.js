import React, { useMemo } from 'react'
import {Button} from "atoms";
import {useHash} from "layout/HashRoutes";
import pick from "lodash/pick";
import {Plus} from "atoms/icons";
import TableSearch from "components/TableSearch";
import Table from "components/Table";
import Pagination from "components/Pagination";

const withCommonTableScreen = function withCommonTableScreen (tableMap, TopBar) {
  return ({ page = {}, filters = {}, onChange, hardQuery }) => {
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
        <TopBar force={hardQuery} />
        <TableSearch keyword={filters.keyword} onSubmit={handleSearch}/>
        <Table
          data={page?.data ?? []}
          skip={page.skip}
          map={tableMap}
        />
        <Pagination {...paginateProps} onChange={handlePaginate}/>
      </div>
    )
  }

}

export default withCommonTableScreen
