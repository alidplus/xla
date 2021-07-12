import React, { useState, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import pick from "lodash/pick";
import {useDropzone} from 'react-dropzone'
import {fsDuck} from "../store/services";
import {connect} from "react-redux";
import FsGallery from './FsGallery'

const dropZoneCss = {
  minHeight: '100px',
  border: '3px dashed',
  cursor: 'pointer'
}
const FsUploader = (allProps)=> {
  const { target, pathname, model, requestQueue, queue, count = 10, thumbNail, ...props } = allProps
  if (!target) return null
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    requestQueue(acceptedFiles.slice(0, count), { target, pathname, model, count })
  }, [])
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, accept: props.accept, multiple: count > 1 })
  return (
    <>
      <div className={classNames("d-flex flex-wrap justify-content-center align-items-center py-2", {'shadow-lg': isDragActive })} style={dropZoneCss} {...getRootProps()} onClick={open}>
        <input {...getInputProps()} />
        {queue.length ?
          queue.map((f, i) => React.cloneElement(thumbNail, { file: f, key: f.url })) :
          <span>Drop an image here...</span>
        }
      </div>
      <FsGallery {...allProps}/>
    </>
  )
}

FsUploader.propTypes = {
  model: PropTypes.oneOf(['users', 'leagues', 'teams', 'referees', 'sponsors', 'players', 'matches', 'events']),
  target: PropTypes.string,
  pathname: PropTypes.oneOf(['avatar', 'symbol', 'gallery', 'flag', 'shape', 'logo', 'banner']),
}

FsUploader.defaultProps = {
  // ...FormGroup.defaultProps,
}

const mapStateToProps = (state, props) => {
  const { target, model, pathname } = props
  return {
    queue: fsDuck.selectors.queue(state, { target, model, pathname })
  }
}
const mapActionsToProps = {
  requestQueue: fsDuck.creators.queue
}
export default connect(mapStateToProps, mapActionsToProps)(FsUploader)
