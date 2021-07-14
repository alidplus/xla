import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody } from 'atoms'
import './Card.module.scss'

const UserCard = ({ data }) => {
  if (!data) return null
  return (
    <Card>
      <CardBody>
        <div className="test-text">ttttttttt</div>
        <pre>{JSON.stringify({data}, null, 2)}</pre>
      </CardBody>
    </Card>
  )
}

UserCard.propTypes = {
  data: PropTypes.object
}

export default UserCard
