import { all } from 'redux-saga/effects'
import layout from './layout'
import ducks from './services/index'

export default function* rootSaga() {
    yield all(([
      ...layout.takes,
      ...ducks.users.takes,
      ...ducks.teams.takes,
      ...ducks.leagues.takes,
      ...ducks.matches.takes,
      ...ducks.players.takes,
      ...ducks.events.takes,
      ...ducks.referees.takes,
      ...ducks.sponsors.takes,
      ...ducks.fs.takes,
      ...ducks.leagueTeams.takes,
      ...ducks.leaguePlayers.takes
    ]))
}
