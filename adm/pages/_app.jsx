import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga';
import createStore from "store";
import { PersistGate } from 'redux-persist/integration/react';
import HashRoutes from 'layout/HashRoutes'
import { SWRConfig } from 'swr'
import fetchJson from 'lib/fetchJson'
import { sessionMiddleware } from 'lib/session'
import authDuck from 'store/auth'
// Main SCSS
import "assets/scss/main.scss";
import client from "store/api/feathersClient";

const swrConf = {
  fetcher: fetchJson,
  onError: (err) => {
    console.error(err)
  },
}

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }
  static async getInitialProps({ Component, ctx }) {
    const { store, isServer, req, res, query: { amp } } = ctx;
    await sessionMiddleware(req, res)
    const auth = req && req.session ? await req.session.get('accessToken') : null
    // console.log(req.session, auth, 'auth', ctx.pathname)
    try {
      if (auth && auth.accessToken) await store.dispatch(authDuck.creators.reAuthenticate(auth.accessToken));
    } catch (e) {
    }
    const appProps = await App.getInitialProps({ Component, ctx });
    return { ...appProps, auth };
  }
  async UNSAFE_componentWillMount(){
    const { auth } = this.props
    if (auth && auth.accessToken) {
      await client.authentication.setAccessToken(auth.accessToken)
      await client.authentication.reAuthenticate()
    }
  }
  render() {
    const { Component, pageProps, store, user = {} } = this.props;
    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <SWRConfig value={swrConf}>
            <HashRoutes>
              <Component {...pageProps} />
            </HashRoutes>
          </SWRConfig>
        </PersistGate>
      </Provider>
    );
  }
}

// export const getServerSideProps = withSession(async function ({ req, res }) {
//   const user = req.session.get('auth')
//   console.log('rs', user)
//   return {
//     props: { user:  {ali: 44} },
//   }
// })

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async appContext => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default withRedux(createStore)(withReduxSaga(MyApp));
