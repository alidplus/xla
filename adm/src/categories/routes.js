import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/categories/add/new', Screen: Add },
    { path: '/categories/edit/:id', Screen: Edit },
    { path: '/categories/view/:id', Screen: View },
    { path: '/categories/remove/:id', Screen: Remove },
  ]
}
