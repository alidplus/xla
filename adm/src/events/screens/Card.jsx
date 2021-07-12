import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'

const EventCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

EventCard.propTypes = {
  data: PropTypes.object
}

export default EventCard
