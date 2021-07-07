import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
const TeamCard = ({ data }) => {
  return (
    <Card body>
      <h5>{data.title.fa} [{data.title.abr}]</h5>
      <small>{data.title.en}</small>
    </Card>
  )
}

TeamCard.propTypes = {
  data: PropTypes.object
}
export default TeamCard

