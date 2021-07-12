import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'atoms'

import SingleLayout from '../layout/SingleLayout';
import HeadDefault from '../layout/head/HeadDefault';

import LoadUserContainer from "../src/users/containers/Load";
import InlineUserScreen from "../src/users/screens/Inline";

import LoadTeamContainer from "../src/teams/containers/Load";
import InlineTeamScreen from "../src/teams/screens/Inline";

import LoadLeagueContainer from "../src/leagues/containers/Load";
import InlineLeagueScreen from "../src/leagues/screens/Inline";

import LoadMatchContainer from "../src/matches/containers/Load";
import InlineMatchScreen from "../src/matches/screens/Inline";

import LoadPlayerContainer from "../src/players/containers/Load";
import InlinePlayerScreen from "../src/players/screens/Inline";

import LoadRefereeContainer from "../src/referees/containers/Load";
import InlineRefereeScreen from "../src/referees/screens/Inline";

import LoadSponsorContainer from "../src/sponsors/containers/Load";
import InlineSponsorScreen from "../src/sponsors/screens/Inline";

import LoadFsContainer from "../src/fs/containers/Load";
import InlineFsScreen from "../src/fs/screens/Inline";

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
        <div dispatch={dispatch} storeLayout={storeLayout}>
          <h3>Inlines</h3>
          <Row>
            <Col>
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
              <hr/>
              <h6>Match inline</h6>
              <LoadMatchContainer id="60ec26808eb80f5ee42f5e1c">
                <InlineMatchScreen/>
              </LoadMatchContainer>
            </Col>
            <Col>
              <h6>Match inline</h6>
              <LoadPlayerContainer id="60ec2caf8eb80f5ee42f5ebd">
                <InlinePlayerScreen/>
              </LoadPlayerContainer>
              <hr/>
              <h6>Referee inline</h6>
              <LoadRefereeContainer id="60ec312e8eb80f5ee42f5f7c">
                <InlineRefereeScreen/>
              </LoadRefereeContainer>
              <hr/>
              <h6>Sponsor inline</h6>
              <LoadSponsorContainer id="60ec34738eb80f5ee42f6003">
                <InlineSponsorScreen/>
              </LoadSponsorContainer>
              <hr/>
              <h6>Fs inline</h6>
              <LoadFsContainer id="60e956acef012e45149c9335">
                <InlineFsScreen/>
              </LoadFsContainer>
            </Col>
          </Row>
          <div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(state => state)(Index);
