import React from 'react'
import PropTypes from 'prop-types'
import {User} from "atoms/icons";

const MatchInline = ({ data, hash }) => {
  return !data ? null : (
    <span className="cursor-pointer" onClick={e => hash.push(`/matches/view/${data._id}`)}>
      <User className="me-1" />
      <span>{data._id}</span>
    </span>
  )
}

MatchInline.propTypes = {
  data: PropTypes.object
}

export default MatchInline



