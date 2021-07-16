import React, { useState, useEffect } from 'react'
import FixedLoading from './FixedLoading'
import Script from 'next/script'
import {fsDuck} from "../store/services";
import {connect} from "react-redux";


const fileRobot = "https://cdn.scaleflex.it/plugins/filerobot-image-editor/3.12.17/filerobot-image-editor.min.js"

function FsEditor ({ file, children, update }) {
  const [editor, setEditor] = useState(false)
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)

  async function onClick (e) {
    e.stopPropagation()
    e.preventDefault()
    if (loaded)
      openEditor()
    else
      setShow(true)
  }

  useEffect(() => {
    if (show && loaded) {
      const ImageEditor = new FilerobotImageEditor({
        tools: ['adjust', 'effects', 'filters', 'rotate', 'crop', 'resize', 'watermark', 'shapes', 'image', 'text'],
        finishButtonLabel: 'Finish',
        reduceBeforeEdit: {
          mode: 'auto',
          widthLimit: 1024,
          heightLimit: 960
        },
        cropPresets: [
          { name: 'square', value: 1 }
        ]
      },
      {
        onBeforeComplete({ status, imageName, imageMime, canvas }) {
          canvas.toBlob(function(blob) {
            update(blob, file)
          });
          return false
        },
        onError(object) {
          console.log('filerobot-image-editor errrrrr', object)
        }
      });
      setEditor(ImageEditor)
      ImageEditor.open(file.url);
    }
  }, [show, loaded])

  function openEditor() {
    editor.open(file.url);
  }

  return (
    <>
      {show && <Script src={fileRobot} onLoad={() => setLoaded(true)}/>}
      {show && !loaded ? <FixedLoading onClose={() => setShow(false)} /> : null}
      {React.cloneElement(children, { file, onClick })}
    </>
  )
}

const mapActionsToProps = {
  update: fsDuck.creators.updateQueuedObject
}
export default connect(null, mapActionsToProps)(FsEditor)
