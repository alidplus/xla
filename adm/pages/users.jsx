import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import {Hash} from "../layout/HashRoutes";

import MainLayout from '../layout/MainLayout';
import HeadDefault from '../layout/head/HeadDefault';
import AdminUsers from "../containers/user/List";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false };
  }

  // static async getInitialProps(props) {
  //   // const { store, isServer, req, res } = props.ctx;
  //   // await store.dispatch(authDuck.creators.authenticate('admin', '000'));
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
          <AdminUsers/>
        </MainLayout>
      </>
    );
  }
}

export default Index
