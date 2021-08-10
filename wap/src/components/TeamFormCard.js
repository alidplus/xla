import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";


const avatarStyle= {width:"40px"}
const TeamFormCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">TeamFormCard</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
      <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="ratio ratio-1x1" style={avatarStyle}>
              <img src="./AMP_0081.JPG" className="rounded-circle" />
            </div>
            <div className="text-start me-auto ms-2">
              <div>عباس عظیمی</div>
              <div>سرمربی</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center mt-2">
            <div className="ratio ratio-1x1" style={avatarStyle}>
              <img src="./AMP_0081.JPG" className="rounded-circle" />
            </div>
            <div className="text-start me-auto ms-2">
              <div>ایدین کیانی</div>
              <div>1 دروازبان</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center mt-2">
            <div className="ratio ratio-1x1" style={avatarStyle}>
              <img src="./AMP_0081.JPG" className="rounded-circle" />
            </div>
            <div className="text-start me-auto ms-2">
              <div>رضا حنیفه</div>
              <div>10 مهاجم</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center mt-2">
            <div className="ratio ratio-1x1" style={avatarStyle}>
              <img src="./AMP_0081.JPG" className="rounded-circle" />
            </div>
            <div className="text-start me-auto ms-2">
              <div>علی قربانی</div>
              <div>4 مدافع</div>
            </div>
          </div>
      </CardBody>
    </Card>
  )
}

export default TeamFormCard
