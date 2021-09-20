<<<<<<< HEAD
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
=======
import React, { useMemo } from 'react'
import moment from 'moment-jalaali'
import {Card, CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";
import { LargeAvatar, SmallAvatar, SquareAvatar } from './Avatar';
import useCommonGet from '../lib/useCommonGet'

const MatchesCard = ({ match }) => {
  const leagueHomeTeam = useCommonGet('leagueTeams', match.home)
  const leagueAwayTeam = useCommonGet('leagueTeams', match.away)
  const homeTeam = useCommonGet('teams', leagueHomeTeam?.team)
  const awayTeam = useCommonGet('teams', leagueAwayTeam?.team)
  const started = true//moment(match.startTime).isBefore(moment())
  const formattedStartTime = useMemo(() => {
    return moment(match.startTime).format('HH : mm')
  }, [match.startTime])
  return (
      <Row className="mb-3" noGutters>

        <Col className="p-0">
          <div className="w-100 d-flex justify-content-end align-items-center">
            <span className="text-end me-2">{homeTeam?.title?.fa}</span>
            <SmallAvatar id={homeTeam?.flag}/>
          </div>
        </Col>

        <Col className="p-0 col-2">
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            {match.timeUp ? (
              <span className="d-flex w-100 justify-content-evenly align-items-center">
                <strong>{match?.result?.home?.goal}</strong>
                <small>-</small>
                <strong>{match?.result?.away?.goal}</strong>
              </span>
            ) : (
              <span className="d-flex w-100 justify-content-evenly align-items-center">
              <small dir="ltr">{formattedStartTime}</small>
            </span>
            )}
          </div>
        </Col>

        <Col className="p-0">
          <div className="w-100 d-flex justify-content-start align-items-center">
            <SmallAvatar id={awayTeam?.flag}/>
            <span className="ms-2">{awayTeam?.title?.fa}</span>
          </div>
        </Col>

      </Row>
  )
}

const MatchesListCard = ({ matches = [] }) => {
  const leagueId = matches[0].league
  const league = useCommonGet('leagues', leagueId)
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">{league?.title ?? '...'}</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <div className="pt-3">
        {matches.map(match => (
          <MatchesCard key={match._id} match={match}/>
        ))}
        {/*<div className="d-flex justify-content-center align-items-center mb-3">
          <span className="text-end me-2">پرسپولیس</span>
          <SmallAvatar/>
          <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
              <strong>0</strong>
              <small>-</small>
              <strong>0</strong>
            </span>
          <SmallAvatar/>
          <span className="ms-2">استقلال</span>
        </div>*/}
        {/*<div className="d-flex justify-content-center align-items-center mb-3">
          <span className="text-end me-2">گچ میانه</span>
          <SmallAvatar/>
          <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
            <small dir="ltr">20 : 15</small>
          </span>
          <SmallAvatar/>
          <span className="ms-2">فولاد</span>
        </div>*/}
>>>>>>> 868ebcb7b9d6b2a8f67025c7361881781b381e79
      </div>
    </Card>
  )
}

export default MatchesListCard
