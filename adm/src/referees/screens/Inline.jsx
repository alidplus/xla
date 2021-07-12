import React from 'react'
import PropTypes from 'prop-types'

const RefereeInline = ({ data }) => {
  return !data ? null : (<span>{data.name} <small>{data.email}</small></span>)
}

RefereeInline.propTypes = {
  data: PropTypes.object
}

export default RefereeInline



