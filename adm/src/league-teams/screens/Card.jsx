import React from 'react'
import PropTypes from 'prop-types'
import { Card, Table } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";

const LeagueTeams = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Fsloader id={data.flag}>
            <Avatar />
          </Fsloader>
        </Col>
      </Row>
      <Row>
        <Col sm>{data.title?.en}</Col>
        <Col className="text-center" sm>{data.title?.abr}</Col>
        <Col className="text-end" sm>{data.title?.fa}</Col>
      </Row>
      <Row>
        <Col className="text-end pt-40">
          <Userloader id={data.owner}>
            <InlineUser />
          </Userloader>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center text-light">spainer</Col>
      </Row>
      <Table borderless>
        <thead>
          <tr>
            <th>رتبه</th>
            <th>تفاضل گل</th>
            <th>امتیاز</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>28</td>
            <td>40</td>
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
