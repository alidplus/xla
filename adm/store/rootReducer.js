import { combineReducers } from 'redux'
import auth from './auth'
import layout from './layout'
import ducks from './services/index'
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
  [ducks.users.store]: ducks.users.reducer,
  [ducks.teams.store]: ducks.teams.reducer,
  [ducks.leagues.store]: ducks.leagues.reducer,
  [ducks.matches.store]: ducks.matches.reducer,
  [ducks.players.store]: ducks.players.reducer,
  [ducks.events.store]: ducks.events.reducer,
  [ducks.referees.store]: ducks.referees.reducer,
  [ducks.sponsors.store]: ducks.sponsors.reducer,
  [ducks.fs.store]: ducks.fs.reducer,
  [layout.store]: prepareReducer(['toggle'], layout)
})

