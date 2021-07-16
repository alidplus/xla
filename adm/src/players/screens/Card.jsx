import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col , Row } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";

const PlayerCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
      <Row>
        <Col>
          <Fsloader id={data.avatar}>
            <Avatar />
          </Fsloader>
        </Col>
        <Col>{data.name}</Col>
      </Row>
      {/*<pre>{JSON.stringify({data}, null, 2)}</pre>*/}
    </Card>
  )
}

PlayerCard.propTypes = {
  data: PropTypes.object
}

export default PlayerCard
