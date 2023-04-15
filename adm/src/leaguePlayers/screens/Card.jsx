import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, CardBody} from 'atoms'
import { At, User, Mobile , Hashtag , Users , Trophy} from 'atoms/icons'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";
import LoadTeamContainer from 'src/teams/containers/Load'
import LoadLeagueContainer from 'src/leagues/containers/Load'
import LoadPlayerContainer from 'src/players/containers/Load'
import UserInlineScreen from 'src/users/screens/Inline'
import LeagueInlineScreen from 'src/leagues/screens/Inline'

const LeaguePlayers = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
     <CardBody>
        {/* <pre>{JSON.stringify({data}, null, 2)}</pre> */}
        <Row className="justify-content-center">
          <Col md="auto">
            <LoadPlayerContainer id={data.player}>
              {({ data }) => (
                <Fsloader id={data.avatar}>
                  <Avatar />
                </Fsloader>
              )}
            </LoadPlayerContainer>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-center">
          <Col className="text-center pb-2" sm="6">{data.name}</Col>
          <Col className="text-center" sm="6"><User/></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center pb-2" sm="6">{data.no}</Col>
          <Col className="text-center" sm="6"><Hashtag/></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center pb-2" sm="6">
              <LoadTeamContainer id={data.team}>
                {({data})=>(
                  <span>{data.title.fa}</span>
                )}
              </LoadTeamContainer>
          </Col>
          <Col className="text-center" sm="6"><Users/></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center pb-2" sm="6">
              <LoadLeagueContainer id={data.league}>
                <LeagueInlineScreen/>
              </LoadLeagueContainer>
          </Col>
          <Col className="text-center" sm="6"><Trophy/></Col>
        </Row>
      </CardBody>
    </Card>
  )
}

LeaguePlayers.propTypes = {
  data: PropTypes.object
}

export default LeaguePlayers
