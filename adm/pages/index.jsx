import React from 'react';
import { connect } from 'react-redux';

import authDuck from '../store/auth'
import SingleLayout from '../layout/SingleLayout';
import HomeScreen from '../containers/HomeScreen';
import HeadDefault from '../layout/head/HeadDefault';
import {NavbarBrand} from "../atoms";

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
        <SingleLayout dispatch={dispatch} storeLayout={storeLayout}>
          <img src="/logo.png" alt="Logo" className="w-50" />
        </SingleLayout>
      </>
    );
  }
}

export default connect(state => state)(Index);
