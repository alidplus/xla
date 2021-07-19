import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col , Row , Badge } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import Avatar from "../../fs/screens/Avatar";
import LoadTeamContainer from 'src/teams/containers/Load'
import TeamInlineScreen from 'src/teams/screens/Inline'

const PlayerCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body className="justify-content-center align-items-center">
      <div className="d-flex w-100 justify-content-between align-items-center">
          <div>
            <Fsloader id={data.avatar}>
              <Avatar size="60px"/>
            </Fsloader>
          </div>
         
          <div className="ms-2">
            <div>
              {data.name}
            </div>
            <div>
              <LoadTeamContainer id={data.team}>
                <TeamInlineScreen en icon={false} />
              </LoadTeamContainer>
            </div>
          </div>
          <div className="ms-auto">
            <div>
              <Badge color="danger">
                <LoadTeamContainer id={data.team}>
                  <TeamInlineScreen abr icon={false}/>
                </LoadTeamContainer>
              </Badge>
            </div>
            <div>
              {data.no}
            </div>
            
          </div>
      </div>
      <hr className="w-100 -my-1 "/>
      <div className="text-muted">
        age : {data.age}
      </div>
    </Card>
  )
}

PlayerCard.propTypes = {
  data: PropTypes.object
}

export default PlayerCard
