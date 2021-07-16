import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col , Row } from 'atoms'
import Fsloader from 'src/fs/containers/Load'

const PlayerCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
       <Row>
            <Col>
              <Fsloader id={data.avatar}>
                {({data: file}) => {
                  if(!file) return null
                  return <img className="rounded-circle img-thumbnail" src={`${process.env.FS_URL}${file.thUrl}`}/>
                }}
              </Fsloader>
              
            </Col>
            <Col>{data.name}</Col>
            <Col>{}</Col>
            <Col></Col>
            <Col></Col>
          </Row>
      <pre>{JSON.stringify({data}, null, 2)}</pre>
    </Card>
  )
}

PlayerCard.propTypes = {
  data: PropTypes.object
}

export default PlayerCard
