import React, { useEffect, useMemo } from 'react'
import { refereesDuck } from 'store/services'
import { connect } from 'react-redux';
import Table from 'src/referees/screens/Table'
import { useRouter } from 'next/router'
import { useHash } from 'layout/HashRoutes'
import { queryBuilder } from '../hooks/useOptionsProvider'

const _uid = 'all-referees-list'

function List ({ uid = _uid, list, array, children }) {
  const router = useRouter()
  const hash = useHash()
  const setFilters = filters => {
    router.push({ pathname: router.pathname, query: filters }, undefined, { shallow: true })
  }
  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = router.query
    const query = { ...queryBuilder(keyword), $skip, $limit }
    list(uid, query)
  }, [router.query])
  const cloneProps = useMemo(
    () => ({ uid, router, hash, array, onChange: setFilters, filters: router.query}),
    [array, router, hash]
  )

  if (typeof children === 'function') return children(cloneProps)

  if (Array.isArray(children))
    return children.map(ch => React.cloneElement(ch, cloneProps))

  return React.cloneElement(children, cloneProps)
}

const mapStateToProps = (state, { uid = _uid }) => {
  return { array: refereesDuck.selectors.find(state, { uid }) }
}

const mapDispatchToProps = {
  list: refereesDuck.creators.list
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
