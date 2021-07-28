import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const TeamNextMatchCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">TeamNextMatchCard</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        TeamNextMatchCard
      </CardBody>
    </Card>
  )
}

export default TeamNextMatchCard
