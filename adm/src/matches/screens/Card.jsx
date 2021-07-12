import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'

const MatcheCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

MatcheCard.propTypes = {
  data: PropTypes.object
}

export default MatcheCard
