import React from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames";
import Icon from './icon'

const SponsorInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash.push(`/players/view/${data._id}`)}>
      <Icon className="me-1" />
      <span>{data.title}</span>
    </span>
  )
}

SponsorInline.propTypes = {
  data: PropTypes.object
}

export default SponsorInline


