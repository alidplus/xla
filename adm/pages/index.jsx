import React from 'react';
import { connect } from 'react-redux';

import MainLayout from '../layout/MainLayout';
import HeadDefault from '../layout/head/HeadDefault';
import LogoutBtn from "../src/auth/containers/Logout";
import {Hash} from "../layout/HashRoutes";
import {Container} from "../atoms";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false };
  }

  // static async getInitialProps(ctx) {
  //   const { store, isServer, req, res } = ctx;
  //   await store.dispatch(authDuck.creators.authenticate('admin', '000'));
  //   return {}
  // }

  render() {
    const { dispatch, storeLayout } = this.props;
    return (
      <>
        <HeadDefault
          title="Home | Next.JS with Reactstrap (React dashboard web application)"
          description="NextJS with Reactstrap components with SCSS library, a NextJS dashboard template."
        />
        <MainLayout dispatch={dispatch} storeLayout={storeLayout}>
          <Container fluid className="d-flex flex-column justify-content-center align-items-center h-100">
            <img src="/logo.png" alt="Logo" className="w-50 mb-5" />
            <hr className="w-50"/>
            <Hash to="/login">Login</Hash>
          </Container>
        </MainLayout>
      </>
    );
  }
}

export default connect(state => state)(Index);
