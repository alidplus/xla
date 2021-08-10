import React from 'react';
import {Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { LargeAvatar } from './Avatar';

const avatarStyle= {width:"40px"}

const BestPlayersCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">بهترین بازیکن(با گل زده)</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <LargeAvatar />
          <div className="text-start me-auto ms-2">
            <div>عباس عظیمی</div>
            <div>تعداد بازی : 25</div>
          </div>
          <div>8</div>
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center pt-3">
          <div className="ratio ratio-1x1" style={avatarStyle}>
            <img src="./AMP_0081.JPG" className="rounded-circle" />
          </div>
          <div className="text-start  me-auto ms-2">
            <div>رضا حنیفه</div>
            <div>تعداد بازی : 20</div>
          </div>
          <div>5</div>
        </div>
      </CardBody>
    </Card>
  )
}

export default BestPlayersCard
