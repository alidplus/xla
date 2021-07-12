import React, {useMemo, useState} from "react";
import classnames from 'classnames'
import {
  HashRouter as Router,
  useHistory,
  useParams,
  withRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Modal, Button } from "atoms";
import { Expand, Compress } from "atoms/icons";
import Login from '../src/auth/containers/Login'
import userRoutes from 'src/users/routes'
import teamRoutes from 'src/teams/routes'
import leagueRoutes from 'src/leagues/routes'
import matcheRoutes from 'src/matches/routes'
import eventRoutes from 'src/events/routes'
import playerRoutes from 'src/players/routes'
import refereeRoutes from 'src/referees/routes'
import sponsorRoutes from 'src/sponsors/routes'

export const HashModal = withRouter(({ children, match }) => {
  const history = useHistory();
  const [show, setShow] = useState(true)
  const [full, setFull] = useState(false)
  function dismiss() { setShow(false) }
  function distroy () { history.goBack() }
  function toggleFullScreen () { setFull(prevState => !prevState) }
  const closeBtn = <Button color="" className="btn-close m-0" onClick={dismiss}></Button>
  const toggleFullBtn = <Button color="" className="btn-icon" onClick={toggleFullScreen}>{!full ? <Expand/> : <Compress/>}</Button>
  const containerProps = useMemo(() => {
    return {
      ...match.params,
      dismiss,
      closeBtn,
      toggleFullScreen,
      toggleFullBtn
    }
  }, [match.params, full])
  return (
    <Modal centered isOpen={show} toggle={dismiss} onClosed={distroy} className={classnames({
      'modal-fullscreen' : full === true,
      [`modal-fullscreen-${full}-down`]: typeof full === 'string',
    })}>
      {React.cloneElement(children, containerProps)}
    </Modal>
  )
})

const hashRoutes = [
  userRoutes,
  teamRoutes,
  leagueRoutes,
  matcheRoutes,
  eventRoutes,
  playerRoutes,
  refereeRoutes,
  sponsorRoutes
]


export default function HashRoutes({ children, routes }) {
    return (
      <Router>
        {children}
        <Switch>
          <Route path="/login">
            <HashModal><Login /></HashModal>
          </Route>
          {hashRoutes.reduce((acc, {Container, routes}) => {
            return acc.concat(routes.map(({ path, Screen }) => {
              return (
                <Route path={path} key={path}>
                  <HashModal>
                    <Container>
                      <Screen/>
                    </Container>
                  </HashModal>
                </Route>
              )
            }))
          }, [])}
        </Switch>
      </Router>
    )
}

export const Hash = Link
export const useHash = useHistory
export const useHashParams = useParams
