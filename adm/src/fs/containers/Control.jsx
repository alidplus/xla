import React, { useEffect } from 'react'

import { fsDuck } from 'store/services'
import { connect } from 'react-redux';
import FsForm from 'src/fs/screens/Form'
import FsCard from 'src/fs/screens/Card'
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
      {control === 'add' ? <FsForm onSubmit={handleSubmit} onError={handleError}/> : null}
      {control === 'edit' ? <FsForm defaultValues={data} onSubmit={handleSubmit} onError={handleError}/> : null}
      {control === 'view' ? <FsCard data={data}/> : null}
      {control === 'remove' ? <FsCard data={data}/> : null}
    </div>
  )
}

function Header ({ control, data }) {
  switch (control) {
    case 'view': return <div>view fs</div>;
    case 'edit': return <div>edit fs</div>;
    case 'remove': return <div>remove fs?</div>;
    case 'add': return <div>create new fs</div>;
    default: return <div>fs control</div>
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
    data: fsDuck.selectors.get(state, { id })
  }
}
const mapActionsToProps = {
  requestGet: fsDuck.creators.get,
  requestSave: fsDuck.creators.save
}
Control.fullscreen = false
Control.Header = connect(mapStateToProps, mapActionsToProps)(Header)
Control.Footer = connect(mapStateToProps, mapActionsToProps)(Footer)
export default connect(mapStateToProps, mapActionsToProps)(Control)
