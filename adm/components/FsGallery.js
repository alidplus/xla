import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {fsDuck} from "../store/services";
import {connect} from "react-redux";
import classNames from "classnames";

const dropZoneCss = {
  minHeight: '100px'
}

const FsGallery = ({ target, pathname, model, requestList, list, thumbNail, ...props })=> {
  useEffect(() => {
    console.log('requestList', list)
    if (!list.total)
      requestList(`${model}-${target}-${pathname}`, { target, pathname, model })
  }, [target, pathname, model])
  if (!list || list?.data?.length === 0) return null
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center py-2" style={dropZoneCss}>
      {(list?.data ?? []).map((f, i) => React.cloneElement(thumbNail, { file: { url: 'http://localhost:3030/fs' + f.thUrl}, key: f.url }))}
    </div>
  )
  return
}

FsGallery.propTypes = {
  model: PropTypes.oneOf(['users', 'leagues', 'teams', 'referees', 'sponsors', 'players', 'matches', 'events']),
  target: PropTypes.string,
  pathname: PropTypes.oneOf(['avatar', 'symbol', 'gallery', 'flag', 'shape', 'logo', 'banner']),
}

FsGallery.defaultProps = {
  // ...FormGroup.defaultProps,
}

const mapStateToProps = (state, props) => {
  const { target, model, pathname } = props
  return {
    list: fsDuck.selectors.list(state, { uid: `${model}-${target}-${pathname}` })
  }
}
const mapActionsToProps = {
  requestList: fsDuck.creators.list
}
export default connect(mapStateToProps, mapActionsToProps)(FsGallery)
