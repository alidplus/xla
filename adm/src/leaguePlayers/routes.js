import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/leaguePlayers/add/new', Screen: Add },
    { path: '/leaguePlayers/edit/:id', Screen: Edit },
    { path: '/leaguePlayers/view/:id', Screen: View },
    { path: '/leaguePlayers/remove/:id', Screen: Remove },
  ]
}
