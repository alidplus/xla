import React, {useEffect, useMemo, useState} from 'react'
import TableCard from "../components/TableCard";
import useCommonList from '../lib/useCommonList'
import moment from "moment-jalaali";
import {Container} from "reactstrap";

// const useMatchesList = useMemo(() => {
//   const day = moment().add(offset, 'days')
//   const dateFrom = day.clone().startOf('day').toDate()
//   const dateTo = day.clone().endOf('day').toDate()
//   const query = { startTime: { $gte: dateFrom, $lte: dateTo } }
//   return useCommonList.bind({}, 'matches', `matches-calendar-day-${offset}`, query)
// }, [])
const emptyQuery = {}
const useLeaguesList = useCommonList.bind({}, 'leagues', 'main-leader-board-teams', emptyQuery)

export default function TeamsLeaderBoard({ subscribeTopNav }) {
  const leagues = useLeaguesList()
  return (
    <Container className="mt-1" fluid>
      <h1 className="h6">جدول لیگ</h1>
      {leagues.map(league => {
        return (
          <div key={league._id}>
            <TableCard league={league} defaultView="form"/>
          </div>
        )
      })}
    </Container>
  )
}
