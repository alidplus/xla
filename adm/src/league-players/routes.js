import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/league-players/add/new', Screen: Add },
    { path: '/league-players/edit/:id', Screen: Edit },
    { path: '/league-players/view/:id', Screen: View },
    { path: '/league-players/remove/:id', Screen: Remove },
  ]
}
