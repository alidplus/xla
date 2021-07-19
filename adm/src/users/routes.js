import Container from './containers/Control'
import LoadContainer from './containers/Load'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/users/add/new', Screen: Add },
    { path: '/users/edit/:id', Screen: Edit },
    { path: '/users/view/:id', Screen: View },
    { path: '/users/remove/:id', Screen: Remove },
  ]
}
