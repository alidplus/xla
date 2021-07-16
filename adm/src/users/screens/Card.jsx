import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody , Row , Col} from 'atoms'
import './Card.module.scss'
import Fsloader from 'src/fs/containers/Load'
import Avatar from 'src/fs/screens/Avatar'
import {At , User , Mobile} from 'atoms/icons'

const UserCard = ({ data }) => {
  if (!data) return null
  return (
    <Card>
      <CardBody>
        {/* <pre>{JSON.stringify({data}, null, 2)}</pre> */}
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Fsloader id={data.avatar}>
              <Avatar />
            </Fsloader>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          <Col className="text-center pb-20" sm="6">{data.name}</Col>
          <Col className="text-center" sm="6"><User/></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center pb-20" sm="6">{data.email}</Col>
          <Col className="text-center" sm="6"><At/></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center pb-20" sm="6">{data.mobile}</Col>
          <Col className="text-center" sm="6"><Mobile/></Col>
        </Row>
      </CardBody>
    </Card>
  )
}

UserCard.propTypes = {
  data: PropTypes.object
}

export default UserCard
