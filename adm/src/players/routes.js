import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/players/add/new', Screen: Add },
    { path: '/players/edit/:id', Screen: Edit },
    { path: '/players/view/:id', Screen: View },
    { path: '/players/remove/:id', Screen: Remove },
  ]
}
