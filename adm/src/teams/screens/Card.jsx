import React from 'react'
import PropTypes from 'prop-types'
import { Card , Row , Col } from 'atoms'
import Fsloader from 'src/fs/containers/Load'
import Userloader from 'src/users/containers/Load'
import { date } from 'joi'
import InlineUser from 'src/users/screens/Inline' 

const TeamCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body>
     <Row className="justify-content-md-center">
            <Col md="auto">
              <Fsloader id={data.flag}>
                {({data: file}) => {
                
                  // return <Avatar file={file}/>
                  return <img className="rounded-circle img-thumbnail" src={`${process.env.FS_URL}${file.thUrl}`}/>
                }}
              </Fsloader>
              
            </Col>
      </Row>
      
      <Row>
        <Col sm>{data.title.en}</Col>
        <Col className="text-center" sm>{data.title.abr}</Col>
        <Col className="text-end" sm>{data.title.fa}</Col>
      </Row>
      <Row>
       <Col className="text-end pt-40">
          <Userloader id={data.owner}>
              <InlineUser />
          </Userloader>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center text-light">spainer</Col>
      </Row>
    </Card>
  )
}

TeamCard.propTypes = {
  data: PropTypes.object
}

export default TeamCard
