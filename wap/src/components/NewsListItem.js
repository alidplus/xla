import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
import { SquareAvatar } from './Avatar';




const NewsListItem = () => {
  return (
    <Card className="mb-2">
      <CardBody>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <SquareAvatar/>
          <div className="flex-grow-1 mx-2">
            <h1 className="h6">خبر گذاری خودمون</h1>
            <p>رضا حنیفه خر است</p>
            <small className="text-muted float-end">دیروز , 12:25 ب ظ</small>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default NewsListItem
