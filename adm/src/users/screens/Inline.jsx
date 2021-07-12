import React from 'react'
import PropTypes from 'prop-types'
import { User } from 'atoms/icons'

const UserInline = ({ data, hash }) => {
  return !data ? null : (
    <span className="cursor-pointer" onClick={e => hash.push(`/users/view/${data._id}`)}>
      <User className="me-1" />
      <span>{data.name}</span>
    </span>
  )
}

UserInline.propTypes = {
  data: PropTypes.object
}

export default UserInline



