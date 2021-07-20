import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";

const LeaguePlayers = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
     <CardBody>
        {/* <pre>{JSON.stringify({data}, null, 2)}</pre> */}
        <Row className="justify-content-center">
          <Col md="auto">
            <Fsloader id={data.avatar}>
              <Avatar />
            </Fsloader>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-center">
          <Col className="text-center pb-20" sm="6">{data.name}</Col>
          <Col className="text-center" sm="6"><User/></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center pb-20" sm="6">{data.email}</Col>
          <Col className="text-center" sm="6"><At/></Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center pb-20" sm="6">{data.mobile}</Col>
          <Col className="text-center" sm="6"><Mobile/></Col>
        </Row>
      </CardBody>
    </Card>
  )
}

LeaguePlayers.propTypes = {
  data: PropTypes.object
}

export default LeaguePlayers
