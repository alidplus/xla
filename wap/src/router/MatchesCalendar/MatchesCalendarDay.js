import React, { useMemo } from 'react'
import moment from 'moment-jalaali'
import groupBy from 'lodash/groupBy'
import useCommonList from '../../lib/useCommonList'
import MatchesListCard from '../../components/MatchesListCard'

function MatchesCalendarDay ({ offset = 0, ...props }) {
  const useMatchesList = useMemo(() => {
    const day = moment().add(offset, 'days')
    const dateFrom = day.clone().startOf('day').toDate()
    const dateTo = day.clone().endOf('day').toDate()
    const query = { startTime: { $gte: dateFrom, $lte: dateTo } }
    return useCommonList.bind({}, 'matches', `matches-calendar-day-${offset}`, query)
  }, [])
  const matches = useMatchesList()
  const groupedMatches = useMemo(() => {
    return groupBy(matches, 'league')
  }, [matches])
  if (!matches?.length) return <div className='text-center'>هیچ رویارویی وجود ندارد</div>
  return (
    <div>
      {Object.keys(groupedMatches).map(leagueId => (
        <MatchesListCard key={leagueId} matches={groupedMatches[leagueId]}/>
      ))}
    </div>
  )
}

export default MatchesCalendarDay
