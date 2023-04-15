import React, { useMemo } from 'react'
import AtomAvatar from 'atoms/Avatar'

const Avatar = function Avatar ({ data, ...props }) {
  if (!data) return null
  return <AtomAvatar circle size="80px" {...props} file={data}/>
}
export default Avatar
