import React, { useState, useMemo } from 'react'
import withCommonViewScreen from "lib/withCommonViewScreen";
import Actions from './Actions'
import TeamInline from './Inline'
import {
  Input,
  Row,
  Col,
  Card,
  CardImg,
  CardImgOverlay,
  ButtonGroup,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'atoms'
import Pagination from "components/Pagination";
import CustomSelectField from "components/form/CustomSelectField";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import LeagueLoadContainer from 'src/leagues/containers/Load'
import PlayerLoadContainer from 'src/players/containers/Load'
import PlayerPositionScreen from 'src/players/screens/Position'
import LeagueCardScreen from "src/leagues/screens/Card";
import usePlayersOptionsProvider from "src/players/hooks/useOptionsProvider";
import classnames from "classnames";
import { Random, Eraser } from "atoms/icons";
import Id from "../../../components/Id";
import ControlToolbar from "../../../components/ControlToolbar";

const Join = ({ data, toggleFullBtn, closeBtn }) => {
  if (!data) return null
  const [league, setLeague] = useState(null)
  const playerQuery = useMemo(() => ({ team: data._id }), [data._id])
  const [selectedPlayerId, setSelectedPlayerId] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [teamForm, setTeamForm] = useState({})
  const { options: players, inpProps, paginateProps, selected: selectedPlayer } = usePlayersOptionsProvider(selectedPlayerId, playerQuery)

  const teamFormPlayers = useMemo(() => Object.values(teamForm), [teamForm])

  const placePlayer = (position, playerId) => {
    if (teamFormPlayers.includes(playerId)) {
      setSelectedPosition(position)
      return
    }
    setTeamForm(state => ({ ...state, [position]: playerId }))
  }

  const handlePlayerClick = (playerId) => {
    if (selectedPosition) {
      placePlayer(selectedPosition, playerId)
      setSelectedPosition(null)
    } else if (selectedPlayerId === playerId) {
      setSelectedPlayerId(null)
    } else {
      setSelectedPlayerId(playerId)
    }
  }

  const handlePositionClick = (position) => {
    if (selectedPlayerId) {
      placePlayer(position, selectedPlayerId)
      setSelectedPlayerId(null)
    } else if (selectedPosition === position) {
      setSelectedPosition(null)
    } else {
      setSelectedPosition(position)
    }
  }

  const handleShuffle = () => {
    const positions = ['GK', 'MR', 'ML', 'FR', 'FL', 'S1', 'S2', 'S3', 'S4', 'S5']
    const newForm = players.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 10).reduce((acc, plyr, index) => {
      acc[positions[index]] = plyr._id
      return acc
    }, {})
    setTeamForm(newForm)
  }

  function positionBox(pos = 'N', className = '') {
    return (
      <div
        className={classnames("position-box w-100", className, { 'border-info text-info': selectedPosition === pos })}
        onClick={e => { handlePositionClick(pos) }}
      >
        {teamForm[pos] ? (
          <PlayerLoadContainer id={teamForm[pos]}>
            <PlayerPositionScreen/>
          </PlayerLoadContainer>
        ) : (
          <span className="position-box-label text-uppercase">{pos}</span>
        )}
      </div>
    )
  }

  function handleSubmit() {
    alert('submit')
  }

  return (
    <div className="h-100 d-flex flex-column">
      <ModalHeader className="d-block p-0" tag="div">
        <div className="d-flex justify-content-between align-items-center">
          {toggleFullBtn}
          <span>Join a league <Id type="event" data={data}/></span>
          {closeBtn}
        </div>
      </ModalHeader>
      <ModalBody className="p-0 flex-grow-1 -d-flex justify-content-center align-items-center">
        <div className="h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <TeamInline data={data}/>
              <hr/>
              {league ? (
                <LeagueLoadContainer id={league}>
                  <LeagueCardScreen/>
                </LeagueLoadContainer>
              ) : (
                <CustomSelectField label="Owner" provider={useLeagueOptionsProvider} getValues={() => league} setValue={(n, v) => (setLeague(v))}/>
              )}
            </div>
            <div className="px-2">
              <Input placeholder="Search" className="mb-2" {...inpProps}/>
              <div className="mb-2">
                <Button className="btn-icon" onClick={handleShuffle}>
                  <Random fw/>
                </Button>
                <Button className="btn-icon" onClick={e => setTeamForm({})}>
                  <Eraser fw/>
                </Button>
              </div>
              {players.map(plyr => {
                return (
                  <div
                    key={plyr.value}
                    className={classnames(
                      "player-box p-2 mb-2 cursor-pointer",
                      { 'border-info text-info': selectedPlayerId === plyr._id },
                      { 'border-success text-success cursor-ban': teamFormPlayers.includes(plyr._id) }
                    )}
                    onClick={e => { handlePlayerClick(plyr._id) }}
                  >
                    {plyr.label}
                  </div>
                )
              })}
              <Pagination {...paginateProps} />
            </div>
            <div className="-flex-grow-1">
              {positionBox('S1', 'w-100 mb-2')}
              {positionBox('S2', 'w-100 mb-2')}
              {positionBox('S3', 'w-100 mb-2')}
              {positionBox('S4', 'w-100 mb-2')}
              {positionBox('S5', 'w-100 mb-2')}
            </div>
            <div className="-flex-grow-1">
              <Card className="bg-football-field h-100">
                <CardImg src="/field.svg" className="card-img h-100"/>
                <CardImgOverlay className="h-100 d-flex flex-column justify-content-between align-items-center">
                  <div className="d-flex justify-content-evenly align-items-center w-100 mt-5">
                    {positionBox('FL', '')}
                    {positionBox('FR', '')}
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center w-100">
                    {positionBox('ML', '')}
                    {positionBox('MR', '')}
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center w-100">
                    {positionBox('GK', '')}
                  </div>
                </CardImgOverlay>
              </Card>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="p-0">
        <Button
          color="primary"
          className="w-75 mx-auto mt-auto"
          disabled={!league || teamFormPlayers.length < 5}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ModalFooter>
    </div>
  )
}

export default withCommonViewScreen(Join, 'user', Actions)
