import React from 'react'
import PropTypes from 'prop-types'
import { Card} from 'atoms'


const NoticeCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body className="justify-content-center align-items-center">
      <div>
        <img src="./AMP_0081.JPG" className="w-100" />
        <h1 className="h5 my-2">{data.title}</h1>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {data.startTime}
          </small>
          <small className="text-info">
            بازدید : 1200
          </small>
        </div>
          <p className="bg-dark p-2">{data.briefNews}</p>
        <p>
          {data.text} 
        </p>
      </div>
    </Card>
  )
}

NoticeCard.propTypes = {
  data: PropTypes.object
}

export default NoticeCard
