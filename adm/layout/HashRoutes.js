import React, {useMemo, useState, useEffect} from "react";
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
import leaguePlayersRoutes from 'src/league-players/routes'
import leagueTeamsRoutes from 'src/league-teams/routes'
import fsRoutes from 'src/fs/routes'

const HModal = ({ children, match }) => {
  const history = useHistory();
  const [show, setShow] = useState(true)
  const [full, setFull] = useState(true)
  function dismiss() { setShow(false) }
  function destroy () {
    // history.entries = [];
    // history.index = -1;
    // history.push('/')
    history.goBack()
  }
  function toggleFullScreen () { setFull(prevState => !prevState) }
  const closeBtn = <Button color="" className="btn-close m-0" onClick={dismiss}/>
  const toggleFullBtn = <Button color="" className="btn-icon" onClick={toggleFullScreen}>{!full ? <Expand/> : <Compress/>}</Button>
  const containerProps = useMemo(() => {
    return {
      ...match.params,
      dismiss,
      closeBtn,
      toggleFullBtn
    }
  }, [match.params, full])

  useEffect(() => {
    const escFunction = function escFunction (event) {
      if(event.keyCode === 27) {
        history.goBack()
      }
    }
    document.addEventListener("keydown", escFunction, false);
    return () =>{ document.removeEventListener("keydown", escFunction, false); }
  }, [])
  return (
    <Modal centered isOpen={show} toggle={dismiss} onClosed={destroy} size="lg" className={classnames({
      'modal-fullscreen' : full === true,
      [`modal-fullscreen-${full}-down`]: typeof full === 'string',
    })}>
      {React.cloneElement(children, containerProps)}
    </Modal>
  )
}

export const HashModal = withRouter(HModal)

const hashRoutes = [
  userRoutes,
  teamRoutes,
  leagueRoutes,
  matcheRoutes,
  eventRoutes,
  playerRoutes,
  refereeRoutes,
  sponsorRoutes,
  fsRoutes,
  leaguePlayersRoutes,
  leagueTeamsRoutes
]

const HashRoutes = function HashRoutes({ children, routes }) {
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/login">
          <HashModal><Login /></HashModal>
        </Route>
        {hashRoutes.reduce((acc, {Container: SuperContainer, routes}) => {
          return acc.concat(routes.map(({ path, Screen, Container = SuperContainer }) => {
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

export default HashRoutes

export const Hash = Link
export const useHash = useHistory
export const useHashParams = useParams
