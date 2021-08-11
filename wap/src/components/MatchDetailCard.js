import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const MatchDetailCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">اطلاعات بازی</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
      <div className="d-flex w-100 justify-content-between">
          <div>تورنمنت</div>
          <div>لیگ ازادگان</div>
        </div>
        <div className="d-flex w-100 justify-content-between pt-2">
          <div>فصل</div>
          <div>2020/2021</div>
        </div>
        <div className="d-flex w-100 justify-content-between pt-2">
          <div>گروه/مرحله</div>
          <div>فصل عادی-هفته1</div>
        </div>
        <div className="d-flex w-100 justify-content-between pt-2">
          <div>شروع بازی</div>
          <div>تا ساعاتی دیگر</div>
        </div>
      </CardBody>
    </Card>
  )
}

export default MatchDetailCard
