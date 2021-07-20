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
    const persistConfig = { key: module.store, storage, whitelist, /*stateReconciler: hardSet*/ };
    return persistReducer(persistConfig, module.reducer)
  }
  return module.reducer
}

export default combineReducers({
  [auth.store]: auth.reducer,
  [ducks.users.store]: prepareReducer(['xcollection'], ducks.users),
  [ducks.teams.store]: prepareReducer(['xcollection'], ducks.teams),
  [ducks.leagues.store]: prepareReducer(['xcollection'], ducks.leagues),
  [ducks.matches.store]: prepareReducer(['xcollection'], ducks.matches),
  [ducks.players.store]: prepareReducer(['xcollection'], ducks.players),
  [ducks.events.store]: prepareReducer(['xcollection'], ducks.events),
  [ducks.referees.store]: prepareReducer(['xcollection'], ducks.referees),
  [ducks.sponsors.store]: prepareReducer(['xcollection'], ducks.sponsors),
  [ducks.fs.store]: prepareReducer(['xcollection'], ducks.fs),
  [ducks.leagueTeams.store]: prepareReducer(['xcollection'], ducks.leagueTeams),
  [ducks.leaguePlayers.store]: prepareReducer(['xcollection'], ducks.leaguePlayers),
  [layout.store]: prepareReducer(['toggle'], layout)
})

