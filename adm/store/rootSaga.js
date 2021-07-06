import { all } from 'redux-saga/effects'
import auth from './auth'
import layout from './layout'
import user from './services/users.extends'
import services from "./services";

export default function* rootSaga() {
    yield all(([
      ...auth.takes,
      ...layout.takes,
      // ...user.takes
      ...(Object.keys(services).reduce((takes, serviceName) => {
        const duck = services[serviceName]
        return [...takes, ...duck.takes]
      }, [])),
    ]))
}
