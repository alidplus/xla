import React from 'react'
import PropTypes from 'prop-types'

const SponsorInline = ({ data }) => {
  return !data ? null : (<span>{data.name} <small>{data.email}</small></span>)
}

SponsorInline.propTypes = {
  data: PropTypes.object
}

export default SponsorInline



