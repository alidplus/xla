import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/leagues/add/new', Screen: Add },
    { path: '/leagues/edit/:id', Screen: Edit },
    { path: '/leagues/view/:id', Screen: View },
    { path: '/leagues/remove/:id', Screen: Remove },
  ]
}
