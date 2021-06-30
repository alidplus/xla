import { combineReducers } from 'redux'
import auth from './auth'
import layout from './layout'
import user from './services/users.extends'
import services from './services'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const isClient = typeof window !== 'undefined';
const storage = isClient ? require('redux-persist/lib/storage').default : null

const prepareReducer = (whitelist = [], module) => {
  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const persistConfig = { key: module.store, storage, whitelist, stateReconciler: hardSet };
    return persistReducer(persistConfig, module.reducer)
  }
  return module.reducer
}

export default combineReducers({
  [auth.store]: auth.reducer,
  // [user.store]: user.reducer,
  ...(Object.keys(services).reduce((reducers, serviceName) => {
    const duck = services[serviceName]
    reducers[duck.store] = duck.reducer
    return reducers
  }, {})),
  [layout.store]: prepareReducer(['toggle'], layout)
})

