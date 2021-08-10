import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { LargeAvatar } from './Avatar';




const MatchLast5Card = () => {
  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">MatchLast5Card</CardTitle>
        <i className="fa fa-ellipsis-v"/>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex justify-content-between align-items-center">
          <LargeAvatar/>
          <div className="flex-grow-1 px-2">
            <div className="d-flex justify-content-between">
              <div>7</div>
              <div>7</div>
              <div>3</div>
            </div>
            <div className="d-flex justify-content-between ">

              <div className="d-inline-flex align-items-center">
                <i className="fas fa-futbol me-1" />
                <span className="me-1">28</span> 
                <i className="fa px-1 py-2 me-1 bg-danger" />
                <span className="me-1">2</span>
                <i className="fa px-1 py-2 me-1 bg-warning" />
                <span className="me-1">20</span>
              </div>

              <div className="d-inline-flex align-items-center flex-row-reverse">
                <i className="fas fa-futbol ms-1" />
                <span className="ms-1">20</span> 
                <i className="fa px-1 py-2 ms-1 bg-danger" />
                <span className="ms-1">4</span>
                <i className="fa px-1 py-2 ms-1 bg-warning" />
                <span className="ms-1">17</span>
              </div>

            </div>
          </div>
         
          <LargeAvatar/>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span class="badge bg-light me-1 font-monospace">D</span>
            <span class="badge bg-light me-1 font-monospace">D</span>
            <span class="badge bg-success me-1 font-monospace">W</span>
            <span class="badge bg-light me-1 font-monospace">D</span>
            <span class="badge bg-danger me-1 font-monospace">L</span>
          </div>
          <div>
            <span class="badge bg-success me-1 font-monospace">W</span>
            <span class="badge bg-light me-1 font-monospace">D</span>
            <span class="badge bg-success me-1 font-monospace">W</span>
            <span class="badge bg-light me-1 font-monospace">D</span>
            <span class="badge bg-danger me-1 font-monospace">L</span>
          </div>
          
        </div>
      </CardBody>
    </Card>
  )
}

export default MatchLast5Card
