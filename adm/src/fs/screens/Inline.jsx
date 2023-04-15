import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import classnames from "classnames";

const FInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash?.push(`/fs/view/${data._id}`)}>
      <Icon className="me-1" />
      <span>{data.fileName}</span>
    </span>
  )
}

FInline.propTypes = {
  data: PropTypes.object
}

export default FInline



