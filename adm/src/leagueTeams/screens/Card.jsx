import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Row, Col } from 'atoms';
import LoadLeagueContainer from 'src/leagues/containers/Load';
import LoadTeamContainer from 'src/teams/containers/Load';
import LeagueInlineScreen from 'src/leagues/screens/Inline'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";

const LeagueTeams = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <Row className="d-flex justify-content-center align-items-center">
          <Col className="text-center pb-2" sm="4">
              <LoadLeagueContainer id={data.league}>
                <LeagueInlineScreen/>
              </LoadLeagueContainer>
          </Col>
          <Col className="text-center pb-2" sm="4">
              <LoadTeamContainer id={data.team}>
                {({ data })=>(
                  <span>{data.title.fa}</span>
                )}
              </LoadTeamContainer>
          </Col>
          <Col className="text-center pb-2" sm="4">
            <LoadTeamContainer id={data.team}>
              {({ data }) => (
                <Fsloader id={data.flag}>
                  <Avatar />
                </Fsloader>
              )}
            </LoadTeamContainer>
          </Col>
      </Row>
      <hr />
      <Table borderless>
        <thead>
          <tr>
            <th className="text-center">رتبه</th>
            <th className="text-center">تفاضل گل</th>
            <th className="text-center">امتیاز</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">1</td>
            <td className="text-center">28</td>
            <td className="text-center">40</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

LeagueTeams.propTypes = {
  data: PropTypes.object
}

export default LeagueTeams
