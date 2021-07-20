import Container from './containers/Control'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'

export default {
  Container,
  routes: [
    { path: '/referees/add/new', Screen: Add },
    { path: '/referees/edit/:id', Screen: Edit },
    { path: '/referees/view/:id', Screen: View },
    { path: '/referees/remove/:id', Screen: Remove },
  ]
}
