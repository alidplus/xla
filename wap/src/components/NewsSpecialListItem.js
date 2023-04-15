import React from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";

const NewsSpecialListItem = () => {
  return (
   <div>
     <img src="./IMG_20190111_095048_311.jpg" className="w-100"/>
     <h1 className="h5 mt-2">دوس دارم به تیم گارپیز بروم</h1>
     <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted">
          خبرگذاری گارپیز
        </small>
        <small className="text-muted">
         جمعه28تیر1398 , 18:55
        </small>
       
     </div>

   </div>
  )
}

export default NewsSpecialListItem
