import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const MatchLast5Card = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">MatchLast5Card</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        MatchLast5Card
      </CardBody>
    </Card>
  )
}

export default MatchLast5Card
