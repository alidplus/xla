import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import classnames from "classnames";

const PlayerPosition = ({ data, hash }) => {
  return !data ? null : (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex w-100 justify-content-center align-items-center">
        <Icon className="me-1" />
        <strong className="m-0 h4">{data.no}</strong>
      </div>
      <span className="text-truncate w-100">{data.name}</span>
    </div>
  )
}

PlayerPosition.propTypes = {
  data: PropTypes.object
}

export default PlayerPosition



