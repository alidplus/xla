import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const MatchDetailCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">MatchDetailCard</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        MatchDetailCard
      </CardBody>
    </Card>
  )
}

export default MatchDetailCard
