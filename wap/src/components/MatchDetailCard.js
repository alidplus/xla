import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const MatchDetailCard = ({data}) => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">اطلاعات بازی</CardTitle>
      </CardHeader>
      <CardBody className="text-center">
      <div className="d-flex w-100 justify-content-between">
          <div>تورنمنت</div>
          <div>{data.title}</div>
        </div>
        <div className="d-flex w-100 justify-content-between pt-2">
          <div className="text-danger">فصل</div>
          <div>2020/2021</div>
        </div>
        <div className="d-flex w-100 justify-content-between pt-2">
          <div className="text-danger">گروه/مرحله</div>
          <div>فصل عادی-هفته1</div>
        </div>
        <div className="d-flex w-100 justify-content-between pt-2">
          <div className="text-danger">شروع بازی</div>
          <div>تا ساعاتی دیگر</div>
        </div>
      </CardBody>
    </Card>
  )
}

export default MatchDetailCard
