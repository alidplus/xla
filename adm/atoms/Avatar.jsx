import React, { useMemo } from 'react'
import cn from 'classnames'
const s2 = {objectFit: 'cover'}
export default function ({ file, size = '20px', circle = false, className}) {
  const s1 = useMemo(() => ({maxWidth: `${size}`}), [size])
  return (
    <div className={cn(className, "ratio ratio-1x1")} style={s1}>
      <img src={file.url} className={cn("img-thumbnail", { "rounded-circle": circle })} style={s2}/>
    </div>
  )
}
