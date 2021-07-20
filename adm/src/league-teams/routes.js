import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/LeaguePlayers/add/new', Screen: Add },
    { path: '/LeaguePlayers/edit/:id', Screen: Edit },
    { path: '/LeaguePlayers/view/:id', Screen: View },
    { path: '/LeaguePlayers/remove/:id', Screen: Remove },
  ]
}
