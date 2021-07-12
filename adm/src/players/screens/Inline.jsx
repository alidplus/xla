import React from 'react'
import PropTypes from 'prop-types'
import {User} from "../../../atoms/icons";
import classnames from "classnames";

const PlayerInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash.push(`/players/view/${data._id}`)}>
      <User className="me-1" />
      <span>{data.name}</span>
      <span className="ms-2"><small>no.</small>{data.no}</span>
    </span>
  )
}

PlayerInline.propTypes = {
  data: PropTypes.object
}

export default PlayerInline



