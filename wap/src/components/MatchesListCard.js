import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const MatchesListCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">میانه - لیگ بشیک تاش </CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <div className="pt-3">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <span className="w-25 text-end">پرسپولیس</span>
          <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
            <strong>0</strong>
            <small>-</small>
            <strong>0</strong>
          </span>
          <span className="w-25">استقلال</span>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <span className="w-25 text-end">گچ میانه</span>
          <span className="w-25 d-inline-flex justify-content-evenly align-items-center">
            <small dir="ltr">20 : 15</small>
          </span>
          <span className="w-25">فولاد</span>
        </div>
      </div>
    </Card>
  )
}

export default MatchesListCard
