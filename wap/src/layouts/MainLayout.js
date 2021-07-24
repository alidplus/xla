import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Nav, NavItem,
  Navbar, NavbarBrand,
  Card, CardImg, CardBody,
  ListGroup, ListGroupItem
} from 'reactstrap'
import Drawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';
import '../assets/scss/react-drawer-drawer.scss';
import '../assets/scss/burger-menu.scss';


const MainLayout = ({children}) => {
  const history = useHistory()
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
    history.goBack()
  }
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar dark>
          <NavbarBrand href="/">reactstrap</NavbarBrand>
        </Navbar>
        <Navbar dark fixed="top" color="dark" className="bg-dark border border-2 border-top-0 border-end-0 border-secondary border-start-0">
          <Container fluid="xl">
            <div id="nav-icon4" className={classnames("my-2 mx-2", { open: isOpen })} onClick={toggle}>
              <span className="bg-white"/>
              <span className="bg-white"/>
              <span className="bg-white"/>
            </div>
            <Nav className="ms-auto">
              <NavItem className="px-2 me-2">
                <i className="fa fa-calendar-alt"/>
              </NavItem>
              <NavItem className="px-2 me-2">
                <i className="fa fa-star"/>
              </NavItem>
              <NavItem className="px-2 me-2">
                <i className="fa fa-search"/>
              </NavItem>
              <NavItem className="px-2 me-2">
                <i className="fa fa-clock"/>
              </NavItem>
              {history.location.pathname !== '/' ? (
                <NavItem onClick={handleBack} className="px-2">
                  <i className="fa fa-chevron-right"/>
                </NavItem>
              ) : null}
            </Nav>
          </Container>
        </Navbar>
        <div className="flex-grow-1 overflow-scroll">{children}</div>
        <Nav justified className="bg-dark border border-2 border-bottom-0 border-end-0 border-secondary border-start-0">
          <NavItem>
            <NavLink activeClassName="active text-white" className="nav-link text-light" to="/" exact={true}>
              <i className="fa fa-user d-block fa-2x"/>
              <span>salam</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="active text-white" className="nav-link text-light" to="/home-2">
              <i className="fa fa-home d-block fa-2x"/>
              <span>salam</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="active text-white" className="nav-link text-light" to="/home-3">
              <i className="fa fa-cogs d-block fa-2x"/>
              <span>salam</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Drawer
        open={isOpen}
        onClose={e => setIsOpen(false)}
        position="right"
        className="bg-danger"
      >
        <Card className="h-100 bg-dark text-white rounded-0">
          <div className="ratio ratio-21x9 p-2">
            <CardImg src="/logo.png" className="object-fit-cover"/>
          </div>
          <CardBody className="d-flex flex-column">
            <ListGroup flush>
              <Link className="py-3" component={ListGroupItem} to="/">Cras justo odio</Link>
              <Link className="py-3" component={ListGroupItem} to="/">Dapibus ac facilisis in</Link>
              <Link className="py-3" component={ListGroupItem} to="/">Morbi leo risus</Link>
              <Link className="py-3" component={ListGroupItem} to="/">Porta ac consectetur ac</Link>
              <Link className="py-3" component={ListGroupItem} to="/">Vestibulum at eros</Link>
            </ListGroup>
            <ListGroup flush className="mt-auto">
              <Link className="py-3" component={ListGroupItem} onClick={e => history.push('/')}>exigt</Link>
            </ListGroup>
          </CardBody>
        </Card>
      </Drawer>
    </>
  )
}

export default MainLayout
