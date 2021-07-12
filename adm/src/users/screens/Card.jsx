import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'

const UserCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

UserCard.propTypes = {
  data: PropTypes.object
}

export default UserCard
