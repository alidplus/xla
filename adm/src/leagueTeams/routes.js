import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/LeagueTeams/add/new', Screen: Add },
    { path: '/LeagueTeams/edit/:id', Screen: Edit },
    { path: '/LeagueTeams/view/:id', Screen: View },
    { path: '/LeagueTeams/remove/:id', Screen: Remove },
  ]
}
