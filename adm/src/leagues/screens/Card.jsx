import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row , Col } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import FsListContainer from 'src/fs/containers/List'
import Avatar from "../../fs/screens/Avatar";
import Slider from "../../fs/screens/Slider";

const LeagueCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <FsListContainer uid={`league-gallery-${data._id}`} iterate>
        <Slider />
      </FsListContainer>
      <hr />
      <Row className="justify-content-md-center">
        <Col md="auto">{data.title}</Col>
        <Col md="auto">
          <Fsloader id={data.simbol}>
            <Avatar />
          </Fsloader>
        </Col>
      </Row>
      <Row>
        <Col className="text-end pt-3">{data.text}</Col>
      </Row>
      <Row className="pt-3">
        <Col className="text-light">تعداد تیم: {data.teams} </Col>
        <Col className="text-light">
          {data.homeAway}
        </Col>
        <Col className="text-end">فینال:استقلال</Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center text-light">spainer</Col>
      </Row>
    </Card>
  )
}

LeagueCard.propTypes = {
  data: PropTypes.object
}

export default LeagueCard
