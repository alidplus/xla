import React from 'react'
import ControlToolbar from 'components/ControlToolbar'
import Id from 'components/Id'
import FormattedDate from "components/FormattedDate";
import {Button} from "atoms";
import {Plus} from "atoms/icons";
import Icon from "./Icon";
import withCommonTableScreen from 'lib/withCommonTableScreen'
import {useHash} from "../../../layout/HashRoutes";

const tableMap = [
  {
    title: 'ID',
    render: data => (<Id data={data}/>),
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Level',
    key: 'lvl',
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
    pathname: '/referees/add/new',
    state: { force }
  }
  return (
    <div className="mb-2 d-flex align-items-center">
      <Icon size="2"/>
      <h4 className="ms-2 me-auto mb-0">Referees</h4>
      <Button size="sm" onClick={e => hash.push(createdRoute)}><Plus/> Add Referee</Button>
    </div>
  )
}

export default withCommonTableScreen(tableMap, TopBar)
