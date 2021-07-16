import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'atoms'

const FCard = ({ data }) => {
  if (!data) return null
  return (
    <Card className="h-100">
      <CardImg className="h-100 object-fit-contain" src={`${process.env.XLA_FS_URL}${data.url}`}/>
      <CardImgOverlay>
        <CardTitle tag="h5">{data.fileName}</CardTitle>
        <CardText>
          <small className="text-muted">{moment(data.createdAt).format('LLLL')}</small>
        </CardText>
      </CardImgOverlay>
    </Card>
  )
}

FCard.propTypes = {
  data: PropTypes.object
}

export default FCard
