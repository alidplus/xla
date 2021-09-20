import React from 'react'
import moment from "moment";
import {Card, CardHeader, CardTitle} from "reactstrap";
import { SmallAvatar } from './Avatar';
import useCommonGet from "./../lib/useCommonGet";

const SingleMatche = ({match}) => {
  const homeLeagueTeam = useCommonGet('leagueTeams', match.home)
  const homeTeam = useCommonGet('teams', homeLeagueTeam?.team)

  const awayLeagueTeam = useCommonGet('leagueTeams', match.away)
  const awayTeam = useCommonGet('teams', awayLeagueTeam?.team)

  const timeUp = match.timeUp
  const matchClock = moment(match.startTime).format('HH : mm')
  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <span className="text-end me-2">{homeTeam?.title?.fa}</span>
      <SmallAvatar/>
      <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
        {timeUp ?
        <>
            <strong>{match.result.home.goal}</strong>
            <small>-</small>
            <strong>{match.result.away.goal}</strong>
          </>
          :
          <small dir="ltr">{matchClock}</small>
        }
      </span>
      <SmallAvatar/>
      <span className="ms-2">{awayTeam?.title?.fa}</span>
    </div>
  )
}

const MatchesListCard = ({matches , league}) => {

  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">{league.title} <span className="text-muted">- میانه</span></CardTitle>
      </CardHeader>
      <div className="pt-3">
        { matches.map(match => <SingleMatche key={match._id} match={match}/>)}
      </div>
    </Card>
  )
}

export default MatchesListCard
