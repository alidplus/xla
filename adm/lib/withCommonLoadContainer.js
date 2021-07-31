import React, { useState, useEffect, useMemo } from 'react'
import {useRouter} from "next/router";
import {useHash} from "../layout/HashRoutes";
import {connect} from "react-redux";
import {Spinner} from "atoms";

const CommonLoadContainer = function CommonLoadContainer ({ id, get, data, children }) {
  const router = useRouter()
  const hash = useHash()
  useEffect (() => { if (id && (!data || data._id !== id)) get(id) }, [id])

  const cloneProps = useMemo(
    () => ({ id, router, hash, data }),
    [data]
  )

  return useMemo(() => {
    if (!data) return null

    if (typeof children === 'function') return children(cloneProps)

    if (Array.isArray(children))
      return children.map(ch => React.cloneElement(ch, cloneProps))

    return React.cloneElement(children, cloneProps)
  }, [id, data])
}

const withCommonLoadContainer = function withCommonLoadContiner (duck, Component = CommonLoadContainer) {

  const mapStateToProps = (state, props) => {
    const { id } = props
    return {
      ...duck.options.consts,
      data: duck.selectors.get(state, { id })
    }
  }

  const mapDispatchToProps = {
    get: duck.creators.get
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}

export default withCommonLoadContainer

// ===================================class=vs=functional===========================================

// const Observer = ({ value, didUpdate }) => {
//   useEffect(() => {
//     didUpdate(value)
//   }, [value])
//   return null // component does not render anything
// }
//
// class CommonLoadContainer extends React.Component {
//
//   constructor() {
//     super();
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     return this.props.id !== nextProps.id || this.props.data !== nextProps.data
//   }
//
//   load () {
//     const { id, data, get } = this.props
//     if (id && (!data || data._id !== id)) get(id)
//   }
//
//   renderInternal () {
//     const { id, router, hash, data, children } = this.props
//     const cloneProps = { id, router, hash, data }
//     if (!data) return null
//
//     if (typeof children === 'function') return children(cloneProps)
//
//     if (Array.isArray(children))
//       return children.map(ch => React.cloneElement(ch, cloneProps))
//
//     return React.cloneElement(children, cloneProps)
//   }
//
//   render () {
//       return (
//         <React.Fragment>
//           <Observer value={this.props.id} didUpdate={this.load.bind(this)} />
//           {this.renderInternal()}
//         </React.Fragment>
//       )
//   }
//
// }
//
// const withCommonLoadContainer = function withCommonLoadContiner (duck, Component = CommonLoadContainer) {
//
//   const mapStateToProps = (state, props) => {
//     const { id } = props
//     return { data: duck.selectors.get(state, { id }) }
//   }
//
//   const mapDispatchToProps = {
//     get: duck.creators.get
//   }
//
//   return connect(mapStateToProps, mapDispatchToProps)(Component)
//
// }
//
// export default withCommonLoadContainer
