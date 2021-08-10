import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar } from './Avatar';

const MatchHeadCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">MatchHeadCard</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <LargeAvatar/>
            <div>استقلال</div>
          </div>
          <div>
            <div>9:15</div>
            <div>زمان مانده به بازی</div>
          </div>
          <div>
          <LargeAvatar/>
            <div>پرسپولیس</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default MatchHeadCard
