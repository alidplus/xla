import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar, SmallAvatar } from './Avatar';

const TeamHeadCard = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">TeamHeadCard</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <LargeAvatar/>
          <div className="text-start flex-grow-1 mx-2">
            <div>استقلال</div>
            <div>ایران</div>
          </div>
          <div>
            <i class="fas fa-share-alt"></i>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div class="badge bg-light mx-1 p-2 mb-1">1 - 1</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div class="badge bg-light mx-1 p-2 mb-1">2 - 2</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div class="badge bg-success mx-1 p-2 mb-1">3 - 1</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div class="badge bg-light mx-1 p-2 mb-1">0 - 0</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div class="badge bg-danger mx-1 p-2 mb-1">0 - 1</div>
            <SmallAvatar/>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default TeamHeadCard
