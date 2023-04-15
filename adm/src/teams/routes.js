import Container from './containers/Control'
import Paginated from './containers/PaginatedList'
import Add from './screens/Add'
import Edit from './screens/Edit'
import View from './screens/View'
import Remove from './screens/Remove'
import Table from './screens/Table'
import Join from './screens/Join'

export default {
  Container,
  routes: [
    { path: '/teams/add/new', Screen: Add },
    { path: '/teams/edit/:id', Screen: Edit },
    { path: '/teams/view/:id', Screen: View },
    { path: '/teams/remove/:id', Screen: Remove },
    { path: '/teams/query', Screen: Table, Container: Paginated },
    { path: '/teams/:id/join', Screen: Join },
  ]
}
