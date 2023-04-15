import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";

const RefereeCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body className="justify-content-center align-items-center">
      <div className="d-flex w-100 justify-content-center align-items-center">
            <Fsloader id={data.avatar}>
              <Avatar size="60px"/>
            </Fsloader>
      </div>
      <hr className="w-100 -my-1 "/>
      <div className="d-flex w-100 justify-content-between">
        <span>{data.name}</span>
        <div>
          {new Array(data.lvl).fill(<span>&#9733;</span>)}
        </div>
      </div>
    </Card>
  )
}

RefereeCard.propTypes = {
  data: PropTypes.object
}

export default RefereeCard
