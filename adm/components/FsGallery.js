import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {fsDuck} from "../store/services";
import {connect} from "react-redux";
import classNames from "classnames";
import { useHash } from "../layout/HashRoutes";
import {Button, ButtonGroup} from "../atoms";
import {Trash} from "../atoms/icons";

const dropZoneCss = {
  minHeight: '100px'
}

const FsGallery = ({ target, pathname, model, requestList, list, thumbNail, requestRemove, ...props })=> {
  const hash = useHash()
  useEffect(() => {
    if (!list.total)
      requestList(`${model}-${target}-${pathname}`, { target, pathname, model })
  }, [target, pathname, model])
  function attachFsVeiw (data) {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      hash.push(`/fs/view/${data._id}`)
    }
  }
  function attachFsRemove (data) {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      requestRemove(data._id)
    }
  }
  if (!list || list?.data?.length === 0) return null
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center py-2 row" style={dropZoneCss}>
      {(list?.data ?? []).map((f, i) => {
        return (
          <div className="col d-flex flex-column justify-content-center align-items-center" key={ f.url }>
            {React.cloneElement(thumbNail, {
              file: { url: process.env.FS_URL + f.thUrl},
              onClick: attachFsVeiw(f)
            })}
            <ButtonGroup size="sm" className="mt-1">
              <Button size="sm" onClick={attachFsRemove(f)} className="btn-icon"><Trash/></Button>
            </ButtonGroup>
          </div>
        )
      })}
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
  requestList: fsDuck.creators.list,
  requestRemove: fsDuck.creators.remove
}
export default connect(mapStateToProps, mapActionsToProps)(FsGallery)
