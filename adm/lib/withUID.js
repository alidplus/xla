import React, { useMemo } from 'react'

function withUid(WrappedComponent, solidUid = null) {
  return function (props) {
    const uid = useMemo(() => solidUid || Math.floor(Math.random() * 9999999999).toString(16), [])
    return <WrappedComponent {...props} uid={uid}/>
  }
}

export default withUid
