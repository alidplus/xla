import React, { useEffect } from 'react'

import { teamsDuck } from 'store/services'
import { connect } from 'react-redux';
import TeamForm from 'src/teams/screens/Form'
import TeamCard from 'src/teams/screens/Card'
import { Row, Col, Button } from "atoms";

function Control ({ id, control, data, dismiss, requestGet, requestSave }) {
  useEffect (() => {
    if (id !== 'new')
      requestGet(id)
  }, [id])
  const handleSubmit = (edited, e) => {
    if (id && control === 'edit')
      requestSave(id, edited)
    else if (id === 'new' && control === 'add')
      requestSave(null, edited)
    dismiss()
  }
  const handleError = (error, e) => {
    console.log('handleError', error)
  }
  // if (!data) return null
  return (
    <div>
      {control === 'add' ? <TeamForm onSubmit={handleSubmit} onError={handleError}/> : null}
      {control === 'edit' ? <TeamForm defaultValues={data} onSubmit={handleSubmit} onError={handleError}/> : null}
      {control === 'view' ? <TeamCard data={data}/> : null}
      {control === 'remove' ? <TeamCard data={data}/> : null}
    </div>
  )
}

function Header ({ control, data }) {
  switch (control) {
    case 'view': return <div>view team</div>;
    case 'edit': return <div>edit team</div>;
    case 'remove': return <div>remove team?</div>;
    case 'add': return <div>create new team</div>;
    default: return <div>team control</div>
  }
}

function Footer ({ control, data }) {
  if (control !== 'remove') return null
  return (
    <Row className="my-2">
      <Col>
        <Button block color="danger">Yes</Button>
      </Col>
      <Col>
        <Button block color="primary">No</Button>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state, props) => {
  const { id } = props
  return {
    data: teamsDuck.selectors.get(state, { id })
  }
}
const mapActionsToProps = {
  requestGet: teamsDuck.creators.get,
  requestSave: teamsDuck.creators.save
}
Control.fullscreen = false
Control.Header = connect(mapStateToProps, mapActionsToProps)(Header)
Control.Footer = connect(mapStateToProps, mapActionsToProps)(Footer)
export default connect(mapStateToProps, mapActionsToProps)(Control)
