import React, { useEffect, useMemo } from 'react'
import {useRouter} from "next/router";
import {useHash} from "../layout/HashRoutes";
import {usersDuck} from "../store/services";
import {connect} from "react-redux";
import {queryBuilder} from "../src/users/hooks/useOptionsProvider";

const defaultPropsQuery = {}

const CommonPaginateContainer = function CommonPaginateContainer
  ({
    uid = _uid,
    find,
    page,
    queryBuilder, query: propsQuery = defaultPropsQuery,
    children
  }) {
  const router = useRouter()
  const hash = useHash()

  const setFilters = filters => {
    router.push({ pathname: router.pathname, query: filters }, undefined, { shallow: true })
  }

  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10 } = router.query
    const searchQuery = queryBuilder(keyword)
    const query = { $and: [searchQuery, propsQuery], $skip, $limit }
    console.log('qqq query', query)
    find(uid, query)
  }, [router.query, propsQuery])

  const cloneProps = useMemo(
    () => ({ uid, router, hash, page, onChange: setFilters, filters: router.query}),
    [page, router, hash]
  )

  if (typeof children === 'function') return children(cloneProps)

  if (Array.isArray(children))
    return children.map(ch => React.cloneElement(ch, cloneProps))

  return React.cloneElement(children, cloneProps)
}

const withCommonPaginateContainer = function withCommonLoadContiner (duck, queryBuilder, _uid, Component = CommonPaginateContainer) {

  const mapStateToProps = (state, { uid = _uid }) => {
    return {
      page: duck.selectors.find(state, { uid }),
      uid: _uid,
      queryBuilder
    }
  }

  const mapDispatchToProps = {
    find: duck.creators.find
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}

export default withCommonPaginateContainer
