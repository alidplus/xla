import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import classnames from "classnames";

const EventInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash?.push(`/events/view/${data._id}`)}>
      <Icon className="me-1" />
      <span>{data.sid}</span>
    </span>
  )
}

EventInline.propTypes = {
  data: PropTypes.object
}

export default EventInline



