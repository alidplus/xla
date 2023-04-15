import React from 'react';

import MainLayout from 'layout/MainLayout';
import HeadDefault from 'layout/head/HeadDefault';
import PaginatedListContainer from "../src/teams/containers/PaginatedList";
import TableScreen from "../src/teams/screens/Table";

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
          <PaginatedListContainer>
            <TableScreen/>
          </PaginatedListContainer>
        </MainLayout>
      </>
    );
  }
}

export default Index
