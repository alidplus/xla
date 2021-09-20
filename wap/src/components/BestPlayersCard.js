import React, {useEffect, useMemo} from 'react';
import {Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { LargeAvatar } from './Avatar';
import sortBy from "lodash/sortBy";

const avatarStyle= {width:"40px"}

const BestPlayersCard = ({data}) => {
  const topSortedPlayers = useMemo(() => sortBy(data, ["statistics.goal"]).reverse().slice(0, 10), [data])
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">آقای گل</CardTitle>
      </CardHeader>
      <CardBody className="text-center">
        {topSortedPlayers.map(player => (
          <div key={player._id} className="d-flex w-100 justify-content-between align-items-center mb-2">
            <LargeAvatar />
            <div className="text-start me-auto ms-2">
              <div>{player.name}</div>
              <div>شماره پیراهن : {player.no}</div>
            </div>
            <div>{player.statistics.goal}</div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

export default BestPlayersCard
