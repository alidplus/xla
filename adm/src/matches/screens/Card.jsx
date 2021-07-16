import React from 'react'
import PropTypes from 'prop-types'
import { Card , Row , Col } from 'atoms'
import './Card.module.scss'
import LoadTeamContainer from 'src/teams/containers/Load'
import LoadLeaguesContainer from 'src/leagues/containers/Load'
import TeamInlineScreen from 'src/teams/screens/Inline'
import LeaguesInlineScreen from 'src/leagues/screens/Inline'

const MatcheCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <LoadLeaguesContainer id={data.home}>
            <LeaguesInlineScreen fa icon={false} />
          </LoadLeaguesContainer>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto" className="pt-3">
          {data.time}
        </Col>
      </Row>
      <Row className="pt-3">
        <Col></Col>
        <Col>
          <LoadTeamContainer id={data.home}>
            <TeamInlineScreen fa icon={false}/>
          </LoadTeamContainer>
        </Col>
        <Col>0</Col>
        <Col> <hr className="rotate" /> </Col>
        <Col>0</Col>
        <Col>
        <LoadTeamContainer id={data.away}>
            <TeamInlineScreen fa icon={false}/>
          </LoadTeamContainer>
        </Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto pt-3">اسم داور</Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center text-light">spainer</Col>
      </Row>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

MatcheCard.propTypes = {
  data: PropTypes.object
}

export default MatcheCard
