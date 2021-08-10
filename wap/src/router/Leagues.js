import React, { useEffect, useState } from 'react'
import useCommonList from '../lib/useCommonList'
import LeagueOverallCard from '../components/LeagueOverallCard'
import {Container} from "reactstrap";

const useLeaguesList = useCommonList.bind({}, 'leagues', 'leagues-list-page')

const leagueQuery = {
  $populate: 'leagueTeams'
}

export default function Home({ subscribeTopNav }) {
  const [c, count] = useState(0)
  const leagues = useLeaguesList(leagueQuery)

  useEffect(() => {
    subscribeTopNav([
      {
        id: 'fa-cogs',
        icon: <i className="fa fa-cogs"></i>,
        onClick: () => {
          alert('cogsClicked')
        }
      },
      {
        id: 'fa-search',
        icon: <i className="fa fa-search"></i>,
        onClick: () => {
          alert('fa-search')
        }
      }
    ])
  }, [])

  return (
    <Container className="mt-2" fluid>
      {leagues.map(league => (
        <LeagueOverallCard key={league._id} data={league}/>
      ))}
    </Container>
  );
}
