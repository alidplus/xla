import React from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames";
import Icon from './Icon'

const LeaguePlayersInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})}>
      <Icon className="me-1" />
      <span>{data.name}</span>
      {data.lvl && data.lvl > 0 ? <sup className="ms-1">{data.lvl}</sup> : null}
    </span>
  )
}

LeaguePlayersInline.propTypes = {
  data: PropTypes.object
}

export default LeaguePlayersInline



