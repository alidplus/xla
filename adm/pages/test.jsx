import React from 'react';
import { connect } from 'react-redux';

import SingleLayout from '../layout/SingleLayout';
import HeadDefault from '../layout/head/HeadDefault';

import LoadUserContainer from "../src/users/containers/Load";
import InlineUserScreen from "../src/users/screens/Inline";

import LoadTeamContainer from "../src/teams/containers/Load";
import InlineTeamScreen from "../src/teams/screens/Inline";

import LoadLeagueContainer from "../src/leagues/containers/Load";
import InlineLeagueScreen from "../src/leagues/screens/Inline";

class Index extends React.Component {
  constructor(props) {
    super(props);
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
          <div>
            <h3>Inlines</h3>
            <h6>User inline</h6>
            <LoadUserContainer id="60eb1eb78eb80f5ee42f590b">
              <InlineUserScreen/>
            </LoadUserContainer>
            <hr/>
            <h6>Team inline</h6>
            <LoadTeamContainer id="60e805772335b240f89f3c19">
              <InlineTeamScreen/>
            </LoadTeamContainer>
            <hr/>
            <h6>League inline</h6>
            <LoadLeagueContainer id="60ec175f8eb80f5ee42f5cf1">
              <InlineLeagueScreen/>
            </LoadLeagueContainer>
          </div>
        </SingleLayout>
      </>
    );
  }
}

export default connect(state => state)(Index);
