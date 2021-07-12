import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'

const FCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

FCard.propTypes = {
  data: PropTypes.object
}

export default FCard
