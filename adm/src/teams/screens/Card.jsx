import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'

const TeamCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

TeamCard.propTypes = {
  data: PropTypes.object
}

export default TeamCard
