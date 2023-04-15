import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/leagueTeams/add/new', Screen: Add },
    { path: '/leagueTeams/edit/:id', Screen: Edit },
    { path: '/leagueTeams/view/:id', Screen: View },
    { path: '/leagueTeams/remove/:id', Screen: Remove },
  ]
}
