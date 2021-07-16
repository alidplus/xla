import React, { useEffect, useMemo } from 'react'
import {useRouter} from "next/router";
import {useHash} from "../layout/HashRoutes";
import {connect} from "react-redux";

const CommonLoadContainer = function CommonLoadContainer ({ id, get, data, children }) {
  const router = useRouter()
  const hash = useHash()
  useEffect (() => { if (id && (!data || data._id !== id)) get(id) }, [id])

  const cloneProps = useMemo(
    () => ({ id, router, hash, data }),
    [data]
  )

  if (typeof children === 'function') return children(cloneProps)

  if (Array.isArray(children))
    return children.map(ch => React.cloneElement(ch, cloneProps))

  return React.cloneElement(children, cloneProps)
}

const withCommonLoadContainer = function withCommonLoadContiner (duck, Component = CommonLoadContainer) {

  const mapStateToProps = (state, { id }) => {
    return { data: duck.selectors.get(state, { id }) }
  }

  const mapDispatchToProps = {
    get: duck.creators.get
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}

export default withCommonLoadContainer
