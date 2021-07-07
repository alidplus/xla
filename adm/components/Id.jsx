import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const Id = ({ type, data }) => {
  return <span className="text-uppercase">{type}-{data.sid}</span>
}

export default Id

Id.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object/*Of(PropTypes.shape({
    sid: PropTypes.number.isRequired
  }))*/.isRequired
}

Id.defaultProps = {
  type: 'id',
  data: {sid:0}
}
