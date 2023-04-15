import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
import FormattedDate from '../../../components/FormattedDate'


const NoticeCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <img src="./AMP_0081.JPG" className="w-100" />
      <h1 className="h5 my-2">{data.title}</h1>
      <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted">
          <FormattedDate data={data}/>
        </small>
        <small className="text-info">
          بازدید : {data.viewCount}
        </small>
      </div>
      <p className="bg-dark p-2">{data.lead}</p>
      <p>{data.body}</p>
    </Card>
  )
}

NoticeCard.propTypes = {
  data: PropTypes.object
}

export default NoticeCard
