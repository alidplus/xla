import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'atoms';

import layoutDuck from 'store/layout'
import authDuck from 'store/auth'

/* Components */
import NavLeft from './nav/NavLeft';
import NavBar from './nav/NavBar';
import Footer from './foot/Footer';

function MainLayout(mainProps) {
  const { children, sideToggled, toggleSide, activeLink, authUser, logout } = mainProps;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const isWideNav = useMemo(() => {
    return sideToggled ? { width: '240px' } : { width: 0, padding: 0 }
  }, [sideToggled])

  const isWideContent = useMemo(() => {
    return sideToggled ? { marginLeft: '240px' } : { marginLeft: 0 }
  }, [sideToggled])

  const props = {
    /* state vars */
    isOpen,
    isToggled: sideToggled,
    /* toggles */
    toggle,
    toggleLeft: toggleSide,
    activeLink,
    /* auth tools */
    authUser,
    logout
  };

  return (
    <>
      <NavBar {...props} />
      <Container fluid className="min-vh-100" style={{paddingTop: '5rem'}}>
        <Row>
          {sideToggled && <Col className="flex-grow-0">
            <NavLeft activeLink={activeLink}/>
          </Col>}
          <Col className="">
            {children}
          </Col>
        </Row>
      </Container>
      {/*<Footer />*/}
    </>
  );
}

const mapStateToProps = (state) => ({
  sideToggled: layoutDuck.selectors.toggle(state),
  authUser: authDuck.selectors.authUser(state)
});
const mapActionsToProps = {
  toggleSide: layoutDuck.creators.toggle,
  logout: authDuck.creators.logout
}
export default connect(mapStateToProps, mapActionsToProps)(MainLayout)

