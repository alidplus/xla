import React, {useEffect, useState} from "react";
import classnames from 'classnames'
import {
  HashRouter as Router,
  useHistory,
  withRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "atoms";
import Login from '../containers/LoginScreen'
import UserControl from '../containers/user/Control'

export const HashModal = withRouter(({ Component, match }) => {
  const [show, setShow] = useState(true)
  let history = useHistory();
  function dismiss() {
    console.log('on dismiss')
    setShow(false)
  }
  function distroy () {
    console.log('on distroy')
    history.goBack()
  }
  const closeBtn = <Button className="btn-close" onClick={dismiss}></Button>
  const full = Component.fullscreen
  return (
    <Modal centered isOpen={show} toggle={dismiss} onClosed={distroy} className={classnames({
      'modal-fullscreen' : full === true,
      [`modal-fullscreen-${full}-down`]: typeof full === 'string',
    })}>
      <ModalHeader toggle={dismiss} close={closeBtn}>
        {/*/!*{Component.Header ?*/}
        {/*  <Component.Header dismiss={dismiss} {...match.params} /> :*/}
        {/*  null*/}
        {/*}*!/*/}
      </ModalHeader>
      <ModalBody>
        <Component dismiss={dismiss} {...match.params} />
      </ModalBody>
      {Component.Footer ?
        <ModalFooter className="justify-content-center p-0">
          <Component.Footer dismiss={dismiss} {...match.params} />
        </ModalFooter> :
        null
      }
    </Modal>
  )
})

export default function HashRoutes({ children, routes }) {
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/login">
          <HashModal Component={Login}/>
        </Route>
        <Route path="/user/:control/:id">
          <HashModal Component={UserControl}/>
        </Route>
      </Switch>
    </Router>
  );
}

export const Hash = Link
export const useHash = useHistory
