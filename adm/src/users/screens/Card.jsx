import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
const UserCard = ({ data }) => {
  return (
    <Card body>
      <h5>{data.email}</h5>
      <small>@{data.username}</small>
    </Card>
  )
}

UserCard.propTypes = {
  data: PropTypes.object
}
export default UserCard

