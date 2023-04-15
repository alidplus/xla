import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import LoadLeagueTeamContainer from 'src/leagueTeams/containers/Load'
import LoadTeamContainer from 'src/teams/containers/Load'
import TeamInlineScreen from 'src/teams/screens/Inline'
import classnames from "classnames";

const CategorieInline = ({ data, hash, className }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted}, className)}>
      <Icon className="me-1" />
      <span>{data.title}</span>
    </span>
  )
}

CategorieInline.propTypes = {
  data: PropTypes.object
}

export default CategorieInline



