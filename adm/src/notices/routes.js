import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/notices/add/new', Screen: Add },
    { path: '/notices/edit/:id', Screen: Edit },
    { path: '/notices/view/:id', Screen: View },
    { path: '/notices/remove/:id', Screen: Remove },
  ]
}
