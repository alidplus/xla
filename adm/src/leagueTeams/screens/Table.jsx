import React from 'react'
import ControlToolbar from 'components/ControlToolbar'
import Id from 'components/Id'
import FormattedDate from "components/FormattedDate";
import {Button} from "atoms";
import {Plus} from "atoms/icons";
import Icon from "./Icon";
import withCommonTableScreen from 'lib/withCommonTableScreen'
import {useHash} from "../../../layout/HashRoutes";
import TeamInline from "../../teams/screens/Inline";
import LeagueInline from "../../leagues/screens/Inline";
import TeamLoadContainer from "../../teams/containers/Load";
import LeagueLoadContainer from "../../leagues/containers/Load";

const tableMap = [
  {
    title: 'ID',
    render: data => (<Id data={data}/>),
  },
  {
    title: 'League',
    render: data => (<LeagueLoadContainer id={data.league}><LeagueInline></LeagueInline></LeagueLoadContainer>),
  },
  {
    title: 'Team',
    render: data => (<TeamLoadContainer id={data.team}><TeamInline></TeamInline></TeamLoadContainer>),
  },
  {
    title: 'date',
    propName: 'data',
    Component: FormattedDate,
  },
  {
    title: 'Actions',
    width: 140,
    className: 'text-center',
    render: (data) => (<ControlToolbar data={data} hideAdd></ControlToolbar>),
  }
]

const TopBar = function TopBar({force}) {
  const hash = useHash()
  const createdRoute = {
    pathname: '/leagueTeams/add/new',
    state: { force }
  }
  return (
    <div className="mb-2 d-flex align-items-center">
      <Icon size="2"/>
      <h4 className="ms-2 me-auto mb-0">LeagueTeams</h4>
      <Button size="sm" onClick={e => hash.push(createdRoute)}><Plus/> Add LeagueTeams</Button>
    </div>
  )
}

export default withCommonTableScreen(tableMap, TopBar)
