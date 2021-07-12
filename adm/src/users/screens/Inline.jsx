import React from 'react'
import PropTypes from 'prop-types'
import { UserCircle } from 'atoms/icons'
import classnames from "classnames";

const UserInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash.push(`/users/view/${data._id}`)}>
      <UserCircle className="me-1" />
      <span>{data.name}</span>
    </span>
  )
}

UserInline.propTypes = {
  data: PropTypes.object
}

export default UserInline



