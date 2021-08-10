import React, { Suspense, lazy, useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home'
import Home2 from './Home2'
import Leagues from './Leagues'
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
          <AppRoute exact path="/" component={Home} />
          <AppRoute exact path="/home-2" component={Home2} />
          <AppRoute exact path="/home-3" component={Leagues} />
        </Switch>
    </Router>
  )
}
