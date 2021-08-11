import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar, SquareAvatar } from './Avatar';

const TeamNextMatchCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">بازی بعدی</CardTitle>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex w-100 justify-content-between align-items-center">
         <SquareAvatar/>
          <div className="text-start flex-grow-1 mx-2">
            <div>استقلال</div>
            <div>خانگی/لیگ ازادگان</div>
          </div>
        </div>
        <div className="text-start text-muted pt-2">
          یکشنبه , 3 مرداد 1400 , 9:15
        </div>
      </CardBody>
    </Card>
  )
}

export default TeamNextMatchCard
