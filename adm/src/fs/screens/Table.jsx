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
    title: 'File Name',
    className: 'text-truncate',
    key: 'fileName',
  },
  {
    title: 'Model',
    key: 'model',
  },
  {
    title: 'Kind',
    key: 'pathname',
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
    render: (data) => (<ControlToolbar data={data} hideAdd hideEdit></ControlToolbar>),
  }
]

const TopBar = function TopBar() {
  // const hash = useHash()
  return (
    <div className="mb-2 d-flex align-items-center">
      <Icon size="2"/>
      <h4 className="ms-2 me-auto mb-0">Files</h4>
    </div>
  )
}

export default withCommonTableScreen(tableMap, TopBar)
