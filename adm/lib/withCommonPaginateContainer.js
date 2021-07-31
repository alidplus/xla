import React, { useEffect, useMemo } from 'react'
import {useRouter} from "next/router";
import {useHash} from "../layout/HashRoutes";
import {usersDuck} from "../store/services";
import {connect} from "react-redux";
import {queryBuilder} from "../src/users/hooks/useOptionsProvider";
import {Spinner} from "../atoms";
import getByDot from "lodash/get";
import setByDot from "lodash/set";

const defaultPropsQuery = {}

const CommonPaginateContainer = function CommonPaginateContainer
  ({
    uid = _uid,
    find,
    page,
    queryBuilder,
    query: propsQuery = defaultPropsQuery,
    children,
    textSearch = false
  }) {
  const router = useRouter()
  const hash = useHash()

  const setFilters = (filters) => {
    // e.preventDefault()
    const routerQuery = {}
    for (const routerQueryElement in filters) {
      if (filters.hasOwnProperty(routerQueryElement)) {
        const value = getByDot(filters, routerQueryElement, null)
        if (value)
          setByDot(routerQuery, routerQueryElement, value)
      }
    }
    router.push({ pathname: router.pathname, query: routerQuery }, undefined, { shallow: true })
  }

  const handleFind = async (query) => {
    try {
      find(uid, query)
    } catch (e) {
      console.log('some error on CommonPaginateContainer', e.message)
    }
  }

  useEffect(() => {
    const { keyword, skip: $skip = 0, limit: $limit = 10, ...restQuery } = router.query
    // const searchQuery = queryBuilder(keyword)
    const routerRestQuery = {}
    for (const restQueryElement in restQuery) {
      if (restQuery.hasOwnProperty(restQueryElement)) {
        console.log('handleSearch restQueryElement', restQueryElement)
        const value = getByDot(restQuery, restQueryElement, null)
        if (value)
          setByDot(routerRestQuery, restQueryElement.replace('__', '.'), value)
      }
    }
    const query = { $and: [propsQuery, routerRestQuery], $skip, $limit }
    if (textSearch) query.$search = keyword
    handleFind(query)
  }, [router.query, propsQuery])

  const cloneProps = useMemo(
    () => ({ uid, router, hash, page, onChange: setFilters, filters: router.query, hardQuery: propsQuery }),
    [page, router, hash]
  )

  if (!page || !page.data || !Array.isArray(page.data)) return <Spinner size="sm" type="grow" color="light" />

  if (typeof children === 'function') return children(cloneProps)

  if (Array.isArray(children))
    return children.map(ch => React.cloneElement(ch, cloneProps))

  return React.cloneElement(children, cloneProps)
}

const withCommonPaginateContainer = function withCommonLoadContiner (duck, queryBuilder, _uid, Component = CommonPaginateContainer) {
  const mapStateToProps = (state, { uid = _uid }) => {
    return {
      ...duck.options.consts,
      page: duck.selectors.find(state, { uid }),
      uid,
      queryBuilder
    }
  }

  const mapDispatchToProps = {
    find: duck.creators.find
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}

export default withCommonPaginateContainer
