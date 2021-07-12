import React, { useEffect, useMemo } from 'react'
import { usersDuck } from 'store/services'
import { connect } from 'react-redux';
import Table from 'src/users/screens/Table'
import { useRouter } from 'next/router'
import { useHash } from 'layout/HashRoutes'

const _uid = 'all-users-list'

function List ({ uid = _uid, list, array, children }) {
  const router = useRouter()
  const hash = useHash()
  const setFilters = filters => {
    router.push({ pathname: router.pathname, query: filters }, undefined, { shallow: true })
  }
  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = router.query
    const query = { $skip, $limit }
    if (keyword) {
      let rgx = keyword.split(' ').filter(a => a).join('|');
      query['$or'] = [
        {name: {$regex: rgx, $options: 'ig'}},
        {email: {$regex: rgx, $options: 'ig'}},
        {mobile: {$regex: rgx, $options: 'ig'}}
      ];
    }
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
  return { array: usersDuck.selectors.find(state, { uid }) }
}

const mapDispatchToProps = {
  list: usersDuck.creators.list
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
