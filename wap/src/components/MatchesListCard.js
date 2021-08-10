import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar, SmallAvatar, SquareAvatar } from './Avatar';

const MatchesListCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">میانه - لیگ بشیک تاش </CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <div className="pt-3">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <span className="text-end me-2">پرسپولیس</span>
          <SmallAvatar/>
          <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
            <strong>0</strong>
            <small>-</small>
            <strong>0</strong>
          </span>
          <SmallAvatar/>
          <span className="ms-2">استقلال</span>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <span className="text-end me-2">گچ میانه</span>
          <SmallAvatar/>
          <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
            <small dir="ltr">20 : 15</small>
          </span>
          <SmallAvatar/>
          <span className="ms-2">فولاد</span>
        </div>
      </div>
    </Card>
  )
}

export default MatchesListCard
