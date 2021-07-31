import React, { useState, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import {useDropzone} from 'react-dropzone'
import {fsDuck} from "../store/services";
import {connect} from "react-redux";
import FsGallery from './FsGallery'
import {FormGroup, Label} from "atoms";
import FsEditor from './FsEditor';

const dropZoneCss = {
  minHeight: '100px',
  border: '3px dashed',
  cursor: 'pointer'
}
const FsUploader = (allProps)=> {
  const { label, target, pathname, model, requestQueue, queue, count = 10, thumbNail, ...props } = allProps
  if (!target) return null
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    requestQueue(acceptedFiles.slice(0, count), { target, pathname, model, count })
  }, [])
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, accept: props.accept, multiple: count > 1 })
  return (
    <FormGroup className="mb-1">
      <Label>{label}:</Label>
      <div className={classNames("py-2", {'shadow-lg': isDragActive })} style={dropZoneCss} {...getRootProps()} onClick={open}>
        <input {...getInputProps()} />
        <div className="text-center">Drop an image here...</div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {queue.length ?
            queue.map((f, i) => (
              <FsEditor file={f} key={f.url}>{thumbNail}</FsEditor>
            )) :
            null
          }
        </div>
        <FsGallery {...allProps} queue/>
      </div>
    </FormGroup>
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
