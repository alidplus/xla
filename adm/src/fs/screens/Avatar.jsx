import React, { useMemo } from 'react'
import AtomAvatar from 'atoms/Avatar'

const Avatar = function Avatar ({ data }) {
  if (!data) return null
  return <AtomAvatar circle size="40px" file={data}/>
}
export default Avatar
