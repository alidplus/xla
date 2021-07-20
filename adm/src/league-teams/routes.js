import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/League-teams/add/new', Screen: Add },
    { path: '/League-teams/edit/:id', Screen: Edit },
    { path: '/League-teams/view/:id', Screen: View },
    { path: '/League-teams/remove/:id', Screen: Remove },
  ]
}
