import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const Id = ({ data }) => {
  const abr = (!data || !data.__model) ? 'id' :
    data.__model.slice(0,2) + data.__model.charAt(data.__model.length - 2)
  return <span title={data?._id} className="text-uppercase"><small>{abr}.</small><strong>{data?.sid}</strong></span>
}

export default Id

Id.propTypes = {
  data: PropTypes.object
}

Id.defaultProps = {
  data: {sid:0}
}
