import React from 'react'
import {Card, CardHeader, CardBody, CardTitle, CardImg} from "reactstrap";

const LeagueOverallCard = ({ data = {} }) => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <img src="/trophy.gif" className="w-100 my-n5"/>
      </div>
      <Card className="mb-2">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <CardTitle className="mb-0">
            <h1 className="h5 mb-0">{data.title} <small className="text-muted">میانه</small></h1>
          </CardTitle>
          <i className="fa fa-ellipsis-v"/>
        </CardHeader>
        <CardBody className="text-center">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <div>
              <div>1</div>
              <div>سطح لیگ</div>
            </div>
            <div>
              <div>10</div>
              <div>تعداد تیم</div>
            </div>
            <div>
              <div>9</div>
              <div>تعداد هفته</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center pt-3">
            <div>
              <div>-</div>
              <div>برد میزبان</div>
            </div>
            <div>
              <div>-</div>
              <div>مساوی</div>
            </div>
            <div>
              <div>-</div>
              <div>برد میهمان</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center pt-3">
            <div>
              <div>گل</div>
              <div>-</div>
            </div>
            <div>
              <div>کارت قرمز</div>
              <div>-</div>
            </div>
            <div>
              <div>کارت زرد</div>
              <div>-</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LeagueOverallCard
