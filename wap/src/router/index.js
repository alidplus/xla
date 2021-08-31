import React, { Suspense, lazy, useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewsList from './NewsList'
import TeamsLeaderBoard from './TeamsLeaderBoard'
import MatchPage from './MatchPage'
import LeagueTeamPage from './LeagueTeamPage'
import Leagues from './Leagues'
import MatchesCalendar from './MatchesCalendar/index'
import MainLayout from '../layouts/MainLayout'
// import { connect } from "react-redux"
const LayoutTag = ({ children }) => <div>{children}</div>
const Spinner = () => <div>loading...</div>


// const Home = lazy(() => import('./Home'))
// const Home2 = lazy(() => import('./Home2'))
// const Leagues = lazy(() => import('./Leagues'))

const RouteConfig = ({ component: Component, layout = 'main', ...rest }) => {
  const [topNav, setTopNav] = useState({})

  const subscribeTopNav = (items = []) => {
    const state = {}
    items.forEach(({ id, icon, onClick }) => {
      state[id] = {
        icon,
        onClick
      }
    })
    setTopNav(state)
  }

  return (
    <Route
      {...rest}
      render={props => {
        return (
          <MainLayout {...props} topNav={topNav}>
            <Suspense fallback={<Spinner />}>
              <Component {...props} subscribeTopNav={subscribeTopNav} />
            </Suspense>
          </MainLayout>
        )
      }}
    />
  )
}

// const mapStateToProps = state => {
//   return {
//     user: state.auth.login.user,
//     permissions: state.auth.login.permissions
//   }
// }

// const AppRoute = connect(mapStateToProps)(RouteConfig)
const AppRoute = RouteConfig

export default function AppRouter() {
  return (
    <Router>
        <Switch>
          <AppRoute exact path="/" component={MatchesCalendar} />
          <AppRoute exact path="/news" component={NewsList} />
          <AppRoute exact path="/teams" component={TeamsLeaderBoard} />
          <AppRoute exact path="/leagues" component={Leagues} />
          <AppRoute exact path="/match/:id" component={MatchPage} />
          <AppRoute exact path="/league-team/:id" component={LeagueTeamPage} />
        </Switch>
    </Router>
  )
}
