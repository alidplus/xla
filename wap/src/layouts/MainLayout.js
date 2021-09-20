import React, { useState, useEffect, useMemo } from 'react'
import {useSwipeable} from 'react-swipeable'
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

const MainNavTabs = () => {
  return (
    <React.Fragment>
      <Nav justified className="bg-dark border border-2 border-bottom-0 border-end-0 border-secondary border-start-0">
        <NavItem>
          <NavLink activeClassName="active text-white" className="px-0 nav-link text-light" to="/" exact={true}>
            <i className="fa fa-futbol d-block fa-2x"/>
            <span>بازی ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="active text-white" className="px-0 nav-link text-light" to="/news">
            <i className="fa fa-newspaper d-block fa-2x"/>
            <span>اخبار</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="active text-white" className="px-0 nav-link text-light" to="/teams">
            <i className="fa fa-users d-block fa-2x"/>
            <span>تیم ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="active text-white" className="px-0 nav-link text-light" to="/leagues">
            <i className="fa fa-trophy d-block fa-2x"/>
            <span>لیگ</span>
          </NavLink>
        </NavItem>
      </Nav>
    </React.Fragment>
  )
}


const MainLayout = ({children, topNav = {}}) => {

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

  const handleReload = () => {
    window.location.reload()
  }

  const topNavigation = useMemo(() => {
    if (Object.keys(topNav).length) {
      return Object.keys(topNav).map(id => (
        <NavItem key={id} className="px-2 me-2" onClick={topNav[id].onClick}>
          {topNav[id].icon}
        </NavItem>
      ))
    }
    return null
  }, [topNav])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (swipe) => {
      const initial = swipe.initial[0]
      const boundary = window.innerWidth * 0.8
      if (initial > boundary && !isOpen)
        setIsOpen(true)
    },
    onSwipedRight: () => { if (isOpen) setIsOpen(false) },
  });

  return (
    <div className="d-flex flex-column h-100" {...swipeHandlers}>
      {/*{topNavigation}*/}
      <div className="pt-5"/>
      <Navbar dark fixed="top" color="dark" className="py-2 bg-dark border border-2 -border-top-0 border-end-0 border-secondary border-start-0">
        <Container fluid>
          <div id="nav-icon4" className={classnames("my-2 mx-2", { open: isOpen })} onClick={toggle}>
            <span className="bg-white"/>
            <span className="bg-white"/>
            <span className="bg-white"/>
          </div>
          <Nav className="ms-auto zoom-70">
            {topNavigation}
            {history.location.pathname !== '/' ? (
              <NavItem onClick={handleBack} className="px-2">
                <i className="fa fa-chevron-right"/>
              </NavItem>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
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
              <Link className="py-3" to="/">Cras justo odio</Link>
              <Link className="py-3" to="/">Dapibus ac facilisis in</Link>
              <Link className="py-3" to="/">Morbi leo risus</Link>
              <Link className="py-3" to="/">Porta ac consectetur ac</Link>
              <Link className="py-3" to="/">Vestibulum at eros</Link>
            </ListGroup>
            <ListGroup flush className="mt-auto">
              <ListGroupItem className="py-3" onClick={handleReload} to="/">Reload</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Drawer>
      <div className="flex-grow-1 overflow-scroll">
        {children}
      </div>
      <MainNavTabs/>
    </div>
  )
}

export default MainLayout
