import React from 'react'
import PropTypes from 'prop-types'

const EventInline = ({ data }) => {
  return !data ? null : (<span>{data.name} <small>{data.email}</small></span>)
}

EventInline.propTypes = {
  data: PropTypes.object
}

export default EventInline



