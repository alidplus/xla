import React, { useEffect, useMemo } from 'react'
import {useRouter} from "next/router";
import {useHash} from "../layout/HashRoutes";
import {connect} from "react-redux";

const CommonListContainer = function CommonListContainer ({ uid = _uid, list, array, children }) {
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

const withCommonListContainer = function withCommonLoadContiner (duck, queryBuilder, _uid, Component = CommonListContainer) {

  const mapStateToProps = (state, { uid = _uid }) => {
    return { array: duck.selectors.find(state, { uid }) }
  }

  const mapDispatchToProps = {
    list: duck.creators.list
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}

export default withCommonListContainer
