import React, { Suspense, lazy } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainLayout from '../layouts/MainLayout'
// import { connect } from "react-redux"
const LayoutTag = ({ children }) => <div>{children}</div>
const Spinner = () => <div>loading...</div>


const Home = lazy(() => import('./Home'))
const Home2 = lazy(() => import('./Home2'))
const Home3 = lazy(() => import('./Home3'))

const RouteConfig = ({ component: Component, layout = 'main', ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // console.log('RouteConfig', rest, props);
      return (
        /*<ContextLayout.Consumer>
          {context => {
            let LayoutTag = context.VerticalLayout
            if (fullLayout) LayoutTag = context.fullLayout;
            else if (publicLayout) LayoutTag = context.publicLayout;
            else if (emptyLayout) LayoutTag = context.emptyLayout;
            else if (printLayout) LayoutTag = context.printLayout;
            else if (context.state.activeLayout === "horizontal") LayoutTag = context.horizontalLayout;
            else LayoutTag = context.VerticalLayout;
            return (*/
              <MainLayout {...props} permissions={rest.permissions} user={rest.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} permissions={rest.permissions} user={rest.user} />
                  {/*<ToastContainer />*/}
                </Suspense>
              </MainLayout>
            /*)
          }}
        </ContextLayout.Consumer>*/
      )
    }}
  />
)

// const mapStateToProps = state => {
//   return {
//     user: state.auth.login.user,
//     permissions: state.auth.login.permissions
//   }
// }

// const AppRoute = connect(mapStateToProps)(RouteConfig)
const AppRoute = (RouteConfig)

export default function AppRouter() {
  return (
    <Router>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute exact path="/home-2" component={Home2} />
          <AppRoute exact path="/home-3" component={Home3} />
        </Switch>
    </Router>
  )
}
