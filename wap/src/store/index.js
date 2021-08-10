import { applyMiddleware, createStore } from "redux";
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { END } from 'redux-saga';
import { persistStore } from 'redux-persist';

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [reduxThunk, promise, sagaMiddleware]
  const bindMiddleware = (...middlewares) => {
    if (process.env.NODE_ENV !== "production") {
      return composeWithDevTools(applyMiddleware(...middlewares));
    }
    return applyMiddleware(...middlewares);
  };
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware(...middlewares)
  );
  store.__PERSISTOR = persistStore(store);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}
export default configureStore;
