import React, {useEffect, useMemo} from 'react'
import { sponsorsDuck } from 'store/services'
import { connect } from 'react-redux';
import {useRouter} from "next/router";
import {useHash} from "../../../layout/HashRoutes";

function Load ({ id, get, data, children }) {
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

const mapStateToProps = (state, { id }) => {
  return { data: sponsorsDuck.selectors.get(state, { id }) }
}

const mapDispatchToProps = {
  get: sponsorsDuck.creators.get
}

export default connect(mapStateToProps, mapDispatchToProps)(Load)
