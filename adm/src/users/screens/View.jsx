import React, { useState, useMemo } from 'react'
import Card from './Card'
import withCommonViewScreen from 'lib/withCommonViewScreen'
import Actions from './Actions'
import {Nav, NavItem, NavLink, TabContent, TabPane} from "../../../atoms";
import classnames from "classnames";
import PaginatedTeamsContainer from "../../teams/containers/PaginatedList";
import TeamsTableScreen from "../../teams/screens/Table";

const ViewWithDetails = function ViewWithDetails(props) {
  const [activeTab, setActiveTab] = useState('1')

  const teamsQuery = useMemo(() => ({ owner: props.data._id }), [props.data._id])
  return (
    <div className="d-flex h-100">
      <Nav tabs className="flex-column border-end border-start-0 border-bottom-0 border-top-0">
        <NavItem>
          <NavLink
            className={classnames("cursor", { active: activeTab === '1' })}
            onClick={() => { setActiveTab('1'); }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { setActiveTab('2'); }}
          >
            Teams
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="flex-grow-1">
        <TabPane tabId="1">
          <Card {...props} />
        </TabPane>
        <TabPane tabId="2">
          <div className="p-3">
            <PaginatedTeamsContainer query={teamsQuery}>
              <TeamsTableScreen/>
            </PaginatedTeamsContainer>
          </div>
        </TabPane>
      </TabContent>
    </div>
  )
}

export default withCommonViewScreen(ViewWithDetails, 'user')
