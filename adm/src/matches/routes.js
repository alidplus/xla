import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/matches/add/new', Screen: Add },
    { path: '/matches/edit/:id', Screen: Edit },
    { path: '/matches/view/:id', Screen: View },
    { path: '/matches/remove/:id', Screen: Remove },
  ]
}
