import React from 'react'
import moment from "moment";
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar } from './Avatar';
import useCommonGet from "./../lib/useCommonGet";

const MatchHeadCard = ({matche}) => {
  const homeLeagueTeam = useCommonGet('leagueTeams', matche.home)
  const homeTeam = useCommonGet('teams', homeLeagueTeam?.team)

  const awayLeagueTeam = useCommonGet('leagueTeams', matche.away)
  const awayTeam = useCommonGet('teams', awayLeagueTeam?.team)

  const timeUp = matche.timeUp
  const matchClock = moment(matche.startTime).format('HH : mm')

  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">MatchHeadCard</CardTitle>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <LargeAvatar/>
            <div>{homeTeam?.title?.fa}</div>
          </div>
          <div>
            <div> 
              {timeUp ?
                <>
                  <strong>{matche.result.home.goal}</strong>
                  <small>-</small>
                  <strong>{matche.result.away.goal}</strong>
                </>
                :
                <small dir="ltr">{matchClock}</small>
              }
            </div>
            {/* <div>زمان مانده به بازی</div> */}
          </div>
          <div>
          <LargeAvatar/>
            <div>{awayTeam?.title?.fa}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default MatchHeadCard
