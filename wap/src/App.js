import React from 'react';
import Router from './router'
// import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
// import createStore from "./store";

class App extends React.Component {
  store = null
  componentWillMount() {
    // this.store = createStore()
  }
  render() {
    return (
      <Router />
    );
  }
}

export default App;
