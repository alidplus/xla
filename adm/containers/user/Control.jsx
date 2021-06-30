import React, { useEffect } from 'react'

import ducks from 'store/services'
import { connect } from 'react-redux';
import UserForm from 'screens/user/Form'
import UserCard from 'screens/user/Card'
import { Row, Col, Button } from "atoms";

function Control ({ id, control, data, requestGet }) {
  useEffect (() => {
    if (!data && id !== 'new')
      requestGet(id)
  }, [id])
  const handleSave = (data) => {
    console.log('handle save', data)
  }
  return (
    <div>
      {control === 'add' ? <UserForm onSubmit={handleSave}/> : null}
      {control === 'edit' ? <UserForm defaultValues={data} onSubmit={handleSave}/> : null}
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
    data: ducks.users.selectors.get(state, { id })
  }
}
const mapActionsToProps = {
  requestGet: ducks.users.creators.get
}
Control.fullscreen = false
Control.Header = connect(mapStateToProps, mapActionsToProps)(Header)
Control.Footer = connect(mapStateToProps, mapActionsToProps)(Footer)
export default connect(mapStateToProps, mapActionsToProps)(Control)
