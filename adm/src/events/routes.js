import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/events/add/new', Screen: Add },
    { path: '/events/edit/:id', Screen: Edit },
    { path: '/events/view/:id', Screen: View },
    { path: '/events/remove/:id', Screen: Remove },
  ]
}
