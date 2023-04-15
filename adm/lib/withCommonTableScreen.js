import React, { useMemo } from 'react'
import {Button} from "atoms";
import {useHash} from "layout/HashRoutes";
import pick from "lodash/pick";
import {Plus} from "atoms/icons";
import TableSearch from "components/TableSearch";
import Table from "components/Table";
import Pagination from "components/Pagination";

const withCommonTableScreen = function withCommonTableScreen (tableMap, TopBar, AdvancedSearch) {
  return ({ page = {}, filters = {}, onChange, hardQuery }) => {
    const hash = useHash()
    const handleSearch = (data, e) => {
      // console.log('handleSearch', data, e)
      e && e.preventDefault()
      if (e)
        onChange(Object.assign({}, filters, data))
      else
        onChange(Object.assign({}, data))
    }
    const handlePaginate = skip => {
      onChange(Object.assign({}, filters, { skip }))
    }
    const paginateProps = useMemo(() => pick(page, ['total', 'skip', 'limit', 'loading']), [page])
    return (
      <div>
        <TopBar force={hardQuery} />
        <TableSearch filters={filters} onSubmit={handleSearch} Form={AdvancedSearch} />
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
