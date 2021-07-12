import React, { useEffect, useMemo } from 'react'
import { fsDuck } from 'store/services'
import { connect } from 'react-redux';
import Table from 'src/fs/screens/Table'
import { useRouter } from 'next/router'
import { useHash } from 'layout/HashRoutes'
import { queryBuilder } from '../hooks/useOptionsProvider'

const _uid = 'all-fs-table'

function PaginatedList ({ uid = _uid, find, page, children }) {
  const router = useRouter()
  const hash = useHash()
  const setFilters = filters => {
    router.push({ pathname: router.pathname, query: filters }, undefined, { shallow: true })
  }
  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = router.query
    const query = { ...queryBuilder(keyword), $skip, $limit }
    find(uid, query)
  }, [router.query])
  const cloneProps = useMemo(
    () => ({ uid, router, hash, page, onChange: setFilters, filters: router.query}),
    [page, router, hash]
  )

  if (typeof children === 'function') return children(cloneProps)

  if (Array.isArray(children))
    return children.map(ch => React.cloneElement(ch, cloneProps))

  return React.cloneElement(children, cloneProps)
}

const mapStateToProps = (state, { uid = _uid }) => {
  return { page: fsDuck.selectors.find(state, { uid }) }
}

const mapDispatchToProps = {
  find: fsDuck.creators.find
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginatedList)
