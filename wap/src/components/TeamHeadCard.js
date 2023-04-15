import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar, SmallAvatar } from './Avatar';

const TeamHeadCard = () => {
  return (
      <Card body className="text-center mb-2">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <LargeAvatar/>
          <div className="text-start flex-grow-1 mx-2">
            <div>استقلال</div>
            <div>ایران</div>
          </div>
          <div>
            <i className="fas fa-share-alt"></i>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="badge bg-light mx-1 p-2 mb-1">1 - 1</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="badge bg-light mx-1 p-2 mb-1">2 - 2</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="badge bg-success mx-1 p-2 mb-1">3 - 1</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="badge bg-light mx-1 p-2 mb-1">0 - 0</div>
            <SmallAvatar/>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="badge bg-danger mx-1 p-2 mb-1">0 - 1</div>
            <SmallAvatar/>
          </div>
        </div>
      </Card>
  )
}

export default TeamHeadCard
