import React from 'react'
import PropTypes from 'prop-types'

const PlayerInline = ({ data }) => {
  return !data ? null : (<span>{data.name} <small>{data.email}</small></span>)
}

PlayerInline.propTypes = {
  data: PropTypes.object
}

export default PlayerInline



