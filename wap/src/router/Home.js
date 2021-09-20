import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import moment from 'moment-jalaali'
import fa from "moment/locale/fa";

import BestPlayersCard from '../components/BestPlayersCard'
import LeagueOverallCard from '../components/LeagueOverallCard'
import MatchDetailCard from '../components/MatchDetailCard'
import MatchesListCard from '../components/MatchesListCard'
import MatchHeadCard from '../components/MatchHeadCard'
import MatchLast5Card from '../components/MatchLast5Card'
import NewsDetailsPage from '../components/NewsDetailsPage'
import NewsListItem from '../components/NewsListItem'
import NewsSpecialListItem from '../components/NewsSpecialListItem'
import TableCard from '../components/TableCard'
import TeamFormCard from '../components/TeamFormCard'
import TeamHeadCard from '../components/TeamHeadCard'
import TeamNextMatchCard from '../components/TeamNextMatchCard'

import {Container, Button, TabContent, TabPane } from "reactstrap";
import '../assets/scss/scrollbars.scss';

import useCommonList from '../lib/useCommonList'
// hook customization
const useUsersSampleList = useCommonList.bind({}, 'users', 'users-list-sample', {})
const useTeamsSampleList = useCommonList.bind({}, 'teams', 'teams-list-sample', {})
const useLeaguesSampleList = useCommonList.bind({}, 'leagues', 'leagues-list-sample', {})
const useMatchesSampleList = useCommonList.bind({}, 'matches', 'matches-list-sample', {})
const usePlayersSampleList = useCommonList.bind({}, 'players', 'players-list-sample', {})
const useEventsSampleList = useCommonList.bind({}, 'events', 'events-list-sample', {})
const useRefereesSampleList = useCommonList.bind({}, 'referees', 'referees-list-sample', {})
const useSponsorsSampleList = useCommonList.bind({}, 'sponsors', 'sponsors-list-sample', {})
const useFsSampleList = useCommonList.bind({}, 'fs', 'fs-list-sample', {})
const useLeagueTeamsSampleList = useCommonList.bind({}, 'leagueTeams', 'leagueTeams-list-sample', {})
const useLeaguePlayersSampleList = useCommonList.bind({}, 'leaguePlayers', 'leaguePlayers-list-sample', {})

moment.locale("fa", fa);
moment.loadPersian({
  usePersianDigits: true,
  dialect: 'persian-modern'
})

const daysMap = {
  '-1': 'دیروز',
  '0': 'امروز',
  '1': 'فردا'
}

const startDate = moment().subtract(4, 'days')
const tabs = (new Array(10)).fill(0).map((_, i) => i - 4)
  .map(n => {
    const day = startDate.clone().add(n, 'days')
    const absDiff = Math.abs(n)
    return {
      n,
      absDiff,
      day,
      label: absDiff > 1 ? day.format('dddd jDo jMMMM') : daysMap[n]
    }
  })

export default function Home({ subscribeTopNav }) {
  const [activeTab, setActiveTab] = useState(0);

  const sampleUsers = useUsersSampleList()
  const sampleUser = sampleUsers.length ? sampleUsers[0] : {}
  const sampleTeams = useTeamsSampleList()
  const sampleTeam = sampleTeams.length ? sampleTeams[0] : {}
  const sampleLeagues = useLeaguesSampleList()
  const sampleLeague = sampleLeagues.length ? sampleLeagues[0] : {}
  const sampleMatches = useMatchesSampleList()
  const sampleMatche = sampleMatches.length ? sampleMatches[0] : {}
  const samplePlayers = usePlayersSampleList()
  const samplePlayer = samplePlayers.length ? samplePlayers[0] : {}
  const sampleEvents = useEventsSampleList()
  const sampleEvent = sampleEvents.length ? sampleEvents[0] : {}
  const sampleReferees = useRefereesSampleList()
  const sampleReferee = sampleReferees.length ? sampleReferees[0] : {}
  const sampleSponsors = useSponsorsSampleList()
  const sampleSponsor = sampleSponsors.length ? sampleSponsors[0] : {}
  const sampleFs = useFsSampleList()
  const sampleF = sampleFs.length ? sampleFs[0] : {}
  const sampleLeagueTeams = useLeagueTeamsSampleList()
  const sampleLeagueTeam = sampleLeagueTeams.length ? sampleLeagueTeams[0] : {}
  console.log(">>>>>>>>", sampleLeagueTeam);
  const sampleLeaguePlayers = useLeaguePlayersSampleList()
  const sampleLeaguePlayer = sampleLeaguePlayers.length ? sampleLeaguePlayers[0] : {}

  useEffect(subscribeTopNav.bind({}, []), [])
  useEffect(() => {
    const el = document.getElementById(`tab-id-${activeTab}`)
    if (el)
      process.nextTick(() => {
        window.requestAnimationFrame(() => {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        });
      })
  }, [activeTab])

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const sampleLeagueAndTeams = {
    sampleLeague,
    sampleLeagueTeams
  }

  // return <pre>{JSON.stringify({
  //   sampleUser,
  //   sampleTeam,
  //   sampleLeague,
  //   sampleMatche,
  //   samplePlayer,
  //   sampleEvent,
  //   sampleReferee,
  //   sampleSponsor,
  //   sampleF,
  //   sampleLeagueTeam,
  //   sampleLeaguePlayer,
  // }, null, 2)}</pre>
  return (
    <>
      <div className="bg-dark border-0 position-absolute w-100 z-index-10 pt-1 mt-n1 shadow">
        <div className="w-100 overflow-x-scroll scroll-less d-flex justify-content-between text-nowrap">
          {tabs.map((a, i) => (
            <Button
              key={a.n}
              id={`tab-id-${a.n}`}
              size="sm"
              color={activeTab === a.n ? 'flat-primary' : 'flat-secondary'}
              className={classnames("shadow-none me-1 rounded-0 border-top-0 border-start-0 border-end-0", {
                'border-info text-info border-bottom': activeTab === a.n,
                'px-3': a.absDiff > 1,
                'px-4': a.absDiff <= 1,
              })}
              onClick={toggle.bind({}, a.n)}
            >
              {a.label}
            </Button>
          ))}
        </div>
      </div>
      <Container className="mt-5" fluid>
        <TabContent activeTab={activeTab}>
        {tabs.map((a, i) => (
          <TabPane
            key={a.n}
            tabId={a.n}
          >
            <h4>بازی های {a.label}</h4>
            <h6 className="text-center">BestPlayersCard</h6>
            <BestPlayersCard data={sampleLeaguePlayers}/>
            <hr/>

            <h6 className="text-center">LeagueOverallCard</h6>
            <LeagueOverallCard data={sampleLeagueAndTeams}/>
            <hr/>

            <h6 className="text-center">MatchDetailCard</h6>
            <MatchDetailCard data={sampleLeague}/>
            <hr/>

            <h6 className="text-center">MatchesListCard</h6>
            <MatchesListCard league={sampleLeague} matches={sampleMatches}/>
            <hr/>

            <h6 className="text-center">MatchHeadCard</h6>
            <MatchHeadCard matche={sampleMatche}/>
            <hr/>

            <h6 className="text-center">MatchLast5Card</h6>
            <MatchLast5Card data={sampleLeagueTeams}/>
            <hr/>

            <h6 className="text-center">NewsDetailsPage</h6>
            <NewsDetailsPage />
            <hr/>

            <h6 className="text-center">NewsListItem</h6>
            <NewsListItem />
            <hr/>

            <h6 className="text-center">NewsSpecialListItem</h6>
            <NewsSpecialListItem />
            <hr/>

            <h6 className="text-center">TableCard</h6>
            <TableCard defaultView="all" />
            <hr/>

            <h6 className="text-center">TeamFormCard</h6>
            <TeamFormCard />
            <hr/>

            <h6 className="text-center">TeamHeadCard</h6>
            <TeamHeadCard />
            <hr/>

            <h6 className="text-center">TeamNextMatchCard</h6>
            <TeamNextMatchCard />
            <hr/>
          </TabPane>
        ))}
        </TabContent>
      </Container>
    </>
  );
}
