import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'

const LeagueCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

LeagueCard.propTypes = {
  data: PropTypes.object
}

export default LeagueCard
