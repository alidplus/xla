import React from 'react'
import PropTypes from 'prop-types'
import { Card} from 'atoms'
import './Card.module.scss'

import LoadTeamContainer from 'src/teams/containers/Load'
import LoadLeaguesContainer from 'src/leagues/containers/Load'
import LoadRefereeContainer from 'src/referees/containers/Load'
import LoadSponsorContainer from 'src/sponsors/containers/Load'

import TeamInlineScreen from 'src/teams/screens/Inline'
import LeaguesInlineScreen from 'src/leagues/screens/Inline'
import RefereeInlineScreen from 'src/referees/screens/Inline'
import SponsorInlineScreen from 'src/sponsors/screens/Inline'
import FormattedDate from "components/FormattedDate";
import LoadLeagueTeamContainer from "../../leagueTeams/containers/Load";

const MatcheCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body className="justify-content-center align-items-center">
      <LoadLeaguesContainer id={data.league}>
        <LeaguesInlineScreen fa icon={false} />
      </LoadLeaguesContainer>
      <div><FormattedDate data={data} name="time"/></div>
      <div className="d-flex w-100 justify-content-evenly">
        <div>
          <LoadLeagueTeamContainer id={data.home}>
            {({ data }) => (
              <LoadTeamContainer id={data.team}>
                <TeamInlineScreen fa icon="flag" />
              </LoadTeamContainer>
            )}
          </LoadLeagueTeamContainer>
        </div>
        <div>0</div>
        <div>-</div>
        <div>0</div>
        <div>
          <LoadLeagueTeamContainer id={data.away}>
            {({ data }) => (
              <LoadTeamContainer id={data.team}>
                <TeamInlineScreen fa icon="flag" away/>
              </LoadTeamContainer>
            )}
          </LoadLeagueTeamContainer>
        </div>
      </div>
      <LoadRefereeContainer id={data.referee}>
        <RefereeInlineScreen/>
      </LoadRefereeContainer>
      <LoadLeaguesContainer id={data.league}>
        {({ data: league }) => (
          <>
            <hr className="w-100 m-1"/>
            <LoadSponsorContainer id={league.sponsor}>
              <SponsorInlineScreen className="text-muted"/>
            </LoadSponsorContainer>
          </>
        )}
      </LoadLeaguesContainer>
    </Card>
  )
}

MatcheCard.propTypes = {
  data: PropTypes.object
}

export default MatcheCard
