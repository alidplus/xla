import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/sponsors/add/new', Screen: Add },
    { path: '/sponsors/edit/:id', Screen: Edit },
    { path: '/sponsors/view/:id', Screen: View },
    { path: '/sponsors/remove/:id', Screen: Remove },
  ]
}
