import React, { useMemo } from 'react'
import getByDot from 'lodash/get'
import moment from 'moment-jalaali'
import PropTypes from 'prop-types'

const FormattedDate = ({ formatDate, formatTime, name, data }) => {
  const d = getByDot(data, name, null)
  if (!d) return null
  const m = moment(d)
  if (!m.isValid()) return null
  return (
    <small><time dateTime={d.toString()} title={m.format(formatDate + ' - ' + formatTime)} className="text-center">{m.fromNow()}</time></small>
  )
}

export default FormattedDate

FormattedDate.propTypes = {
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

FormattedDate.defaultProps = {
  formatDate: 'jYYYY / jMM / jDD',
  formatTime: 'HH : mm : ss',
  name: 'createdAt',
  data: {}
}
