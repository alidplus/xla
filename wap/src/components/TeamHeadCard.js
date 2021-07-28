import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const TeamHeadCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">TeamHeadCard</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        TeamHeadCard
      </CardBody>
    </Card>
  )
}

export default TeamHeadCard
