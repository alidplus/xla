import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import classnames from "classnames";

const LeagueInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})}>
      <Icon className="me-1" />
      <span>{data.title}</span>
    </span>
  )
}

LeagueInline.propTypes = {
  data: PropTypes.object
}

export default LeagueInline



