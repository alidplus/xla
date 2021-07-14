import React, { useState, useEffect } from 'react'
import Script from 'next/script'

const fileRobot = "https://cdn.scaleflex.it/plugins/filerobot-image-editor/3.12.17/filerobot-image-editor.min.js"

function FsEditor ({ children }) {
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)
  async function onClick (e) {
    e.stopPropagation()
    e.preventDefault()
    setShow(true)
    // alert('onClick')
  }
  useEffect(() => {
    if (show && loaded) {
      const ImageEditor = new FilerobotImageEditor();
      ImageEditor.open('https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg');
    }
  }, [show, loaded])
  return (
    <>
      {show && <Script src={fileRobot} onLoad={() => setLoaded(true)}/>}
      {React.cloneElement(children, { onClick })}
    </>
  )
}

export default FsEditor
