import React, { useEffect } from 'react'

import { usersDuck } from 'store/services'
import { connect } from 'react-redux';
import UserForm from 'src/users/screens/Form'
import UserCard from 'src/users/screens/Card'
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
      {control === 'add' ? <UserForm onSubmit={handleSubmit} onError={handleError}/> : null}
      {control === 'edit' ? <UserForm defaultValues={data} onSubmit={handleSubmit} onError={handleError}/> : null}
      {control === 'view' ? <UserCard data={data}/> : null}
      {control === 'remove' ? <UserCard data={data}/> : null}
    </div>
  )
}

function Header ({ control, data }) {
  switch (control) {
    case 'view': return <div>view user</div>;
    case 'edit': return <div>edit user</div>;
    case 'remove': return <div>remove user?</div>;
    case 'add': return <div>create new user</div>;
    default: return <div>user control</div>
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
    data: usersDuck.selectors.get(state, { id })
  }
}
const mapActionsToProps = {
  requestGet: usersDuck.creators.get,
  requestSave: usersDuck.creators.save
}
Control.fullscreen = false
Control.Header = connect(mapStateToProps, mapActionsToProps)(Header)
Control.Footer = connect(mapStateToProps, mapActionsToProps)(Footer)
export default connect(mapStateToProps, mapActionsToProps)(Control)
