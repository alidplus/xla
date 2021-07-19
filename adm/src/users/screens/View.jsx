import React, { useState, useMemo } from 'react'
import Card from './Card'
import withCommonTabsViewScreen from 'lib/withCommonTabsViewScreen'
// import Actions from './Actions'
// import {Nav, NavItem, NavLink, TabContent, TabPane} from "../../../atoms";
// import classnames from "classnames";
import PaginatedTeamsContainer from "../../teams/containers/PaginatedList";
import TeamsTableScreen from "../../teams/screens/Table";


const useViewLayoutHook = function useViewLayoutHook(props) {

  const teamsQuery = useMemo(() => ({ owner: props.data._id }), [props.data._id])

  return useMemo(() => [
    {
      id: 'default',
      label: 'Details',
      panClassName: 'd-flex justify-content-center align-items-center h-100',
      children: (<Card {...props} className="flex-grow-1" />)
    },
    {
      id: 'teams',
      label: 'Teams',
      panClassName: 'p-3',
      children: (
        <PaginatedTeamsContainer query={teamsQuery}>
          <TeamsTableScreen/>
        </PaginatedTeamsContainer>
      )
    },
  ], [props.data, teamsQuery])
}

export default withCommonTabsViewScreen(useViewLayoutHook, 'user')
