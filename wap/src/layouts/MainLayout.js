import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import { Link, NavLink } from "react-router-dom";
import {
  Collapse, Container, Button,
  Nav, NavItem, NavLink as NavLink2,
  Navbar, NavbarBrand, NavbarToggler, NavbarText,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Card, CardImg, CardBody
} from 'reactstrap'
import Drawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';
import '../assets/styles/react-drawer-drawer.css';
import '../assets/styles/burger-menu.css';


const MainLayout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleMessage (e) {
      const { source, type, payload } = JSON.parse(e.data)
      if (source === 'react-wrapper' && type === 'handleBack') {
        if (isOpen) setIsOpen(false)
        else window.postMessage('handleBack')
      }
    }
    document.addEventListener("message", handleMessage,false);
    return () => { document.removeEventListener('message', handleMessage, false) }
  }, [isOpen])

  const handleBack = () => {
    // window.postMessage('handleBack')
  }

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar dark>
          <NavbarBrand href="/">reactstrap</NavbarBrand>
        </Navbar>
        <Navbar dark fixed="top" color="dark" className="bg-dark border border-2 border-top-0 border-end-0 border-secondary border-start-0">
          <Container fluid="xl">
            <NavbarBrand onClick={handleBack}>Back</NavbarBrand>
            <div id="nav-icon4" className={classnames({ open: isOpen })} onClick={toggle}>
              <span className="bg-white"/>
              <span className="bg-white"/>
              <span className="bg-white"/>
            </div>
          </Container>
        </Navbar>
        <div className="flex-grow-1 overflow-scroll">{children}</div>
        <Nav justified className="bg-dark border border-2 border-bottom-0 border-end-0 border-secondary border-start-0">
          <NavItem>
            <NavLink exact={true} activeClassName="active text-white" className="nav-link text-secondary" to="/">1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="active text-white" className="nav-link text-secondary" to="/home-2">2</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="active text-white" className="nav-link text-secondary" to="/home-3">3</NavLink>
          </NavItem>
        </Nav>
      </div>
      <Drawer
        open={isOpen}
        onClose={e => setIsOpen(false)}
        position="right"
        className="bg-danger"
      >
        <Card className="h-100 bg-dark text-white">
          <div className="ratio ratio-21x9">
            <CardImg src="/logo192.png" className="object-fit-cover"/>
          </div>
          <CardBody>
            salam
          </CardBody>
        </Card>
      </Drawer>
    </>
  )
}

export default MainLayout
