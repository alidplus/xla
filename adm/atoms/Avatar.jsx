import React, { useMemo } from 'react'
import cn from 'classnames'
const s2 = {objectFit: 'cover'}
export default function ({ file, size = '20px', circle = false, className, ...props}) {
  const s1 = useMemo(() => ({width: `${size}`}), [size])
  return (
    <div {...props} className={cn(className, "ratio ratio-1x1")} style={s1}>
      {!file.thUrl ? (
        <img src={file.url} className={cn("img-thumbnail", { "rounded-circle": circle })} style={s2}/>
      ) : (
        <img src={`${process.env.XLA_FS_URL}${file.thUrl}`} className={cn("img-thumbnail", { "rounded-circle": circle })} style={s2}/>
      )}
    </div>
  )
}
