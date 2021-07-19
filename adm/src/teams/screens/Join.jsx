import React, { useState } from 'react'
import withCommonViewScreen from "lib/withCommonViewScreen";
import Actions from './Actions'
import Card from './Card'
import {Row, Col, TabPane} from 'atoms'
import CustomSelectField from "components/form/CustomSelectField";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import LeagueLoadContiner from 'src/leagues/containers/Load'
import LeagueCardScreen from "src/leagues/screens/Card";

const Join = ({ data }) => {
  const [league, setLeague] = useState(null)
  return (
    <div>
      <h1 className="h2 text-center">Join a League</h1>
      <Row>
        <Col sm="3">
          <h2 className="h4 text-center">Team</h2>
          <Card data={data}/>
        </Col>
        <Col>
          Manage
        </Col>
        <Col sm="3">
          <h2 className="h4 text-center">League</h2>
          {league ? (
            <LeagueLoadContiner id={league}>
              <LeagueCardScreen/>
            </LeagueLoadContiner>
          ) : (
            <CustomSelectField label="Owner" provider={useLeagueOptionsProvider} getValues={() => league} setValue={(n, v) => (setLeague(v))}/>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default withCommonViewScreen(Join, 'user', Actions)
