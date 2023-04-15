import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import LoadLeagueTeamContainer from 'src/leagueTeams/containers/Load'
import LoadTeamContainer from 'src/teams/containers/Load'
import TeamInlineScreen from 'src/teams/screens/Inline'
import classnames from "classnames";

const MatchInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})}>
      <Icon className="me-1" />
      <span className="d-inline-flex flex-column align-items-center">
        <span className="d-inline-flex">
          <LoadLeagueTeamContainer id={data.home}>
            {({ data }) => (
              <LoadTeamContainer id={data.team}>
                <TeamInlineScreen abr icon={false}/>
              </LoadTeamContainer>
            )}
          </LoadLeagueTeamContainer>
          <strong className="ms-1">{data.results?.home?.goal ?? ''}</strong>
          <span className="px-1">-</span>
          <strong className="me-1">{data.results?.away?.goal ?? ''}</strong>
          <LoadLeagueTeamContainer id={data.away}>
            {({ data }) => (
              <LoadTeamContainer id={data.team}>
                <TeamInlineScreen abr icon={false}/>
              </LoadTeamContainer>
            )}
          </LoadLeagueTeamContainer>
        </span>
      </span>
    </span>
  )
}

MatchInline.propTypes = {
  data: PropTypes.object
}

export default MatchInline



