import React from 'react';

import MainLayout from 'layout/MainLayout';
import HeadDefault from 'layout/head/HeadDefault';
import AdminTeams from "src/teams/containers/List";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false };
  }

  render() {
    const { dispatch, storeLayout } = this.props;
    return (
      <>
        <HeadDefault
          title="Home | Next.JS with Reactstrap (React dashboard web application)"
          description="NextJS with Reactstrap components with SCSS library, a NextJS dashboard template."
        />
        <MainLayout dispatch={dispatch} storeLayout={storeLayout}>
          <AdminTeams/>
        </MainLayout>
      </>
    );
  }
}

export default Index
