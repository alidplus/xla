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
    title: 'Model',
    key: 'model',
  },
  {
    title: 'Type',
    key: 'variety',
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

const TopBar = function TopBar() {
  const hash = useHash()
  return (
    <div className="mb-2 d-flex align-items-center">
      <Icon size="2"/>
      <h4 className="ms-2 me-auto mb-0">Events</h4>
      <Button size="sm" onClick={e => hash.push('/events/add/new')}><Plus/> Add Event</Button>
    </div>
  )
}

export default withCommonTableScreen(tableMap, TopBar)
