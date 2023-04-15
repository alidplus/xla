import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    // { path: '/fs/add/new', Screen: Add },
    // { path: '/fs/edit/:id', Screen: Edit },
    { path: '/fs/view/:id', Screen: View },
    { path: '/fs/remove/:id', Screen: Remove },
  ]
}
