import React from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames";
import Icon from './Icon'

const SponsorInline = ({ data, hash, className }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted}, className)}>
      <Icon className="me-1" />
      <span>{data.title}</span>
    </span>
  )
}

SponsorInline.propTypes = {
  data: PropTypes.object
}

export default SponsorInline



