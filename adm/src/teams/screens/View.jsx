import React, { useMemo } from 'react'
import Card from './Card'
import Actions from './Actions'
import PaginatedPlayersContainer from "src/players/containers/PaginatedList";
import PlayersTableScreen from "src/players/screens/Table";
import withCommonTabsViewScreen from "lib/withCommonTabsViewScreen";


const useViewLayoutHook = function useViewLayoutHook(props) {
  // const teamArray = props.data?.players || []
  // const playerRequestsQuery = useMemo(() => ({ _id: { $in: teamArray } }), [props.data._id])
  // const playerRequestsQuery = useMemo(() => ({ team: props.data._id, _id: { $nin: teamArray } }), [props.data._id])
  const playerQuery = useMemo(() => ({ team: props.data._id }), [props.data._id])

  return useMemo(() => [
    {
      id: 'default',
      label: 'Details',
      panClassName: 'd-flex justify-content-center align-items-center h-100',
      children: (<Card {...props} className="flex-grow-1" />)
    },
    {
      id: 'players',
      label: 'Players',
      panClassName: 'p-3',
      children: (
        <PaginatedPlayersContainer query={playerQuery}>
          <PlayersTableScreen/>
        </PaginatedPlayersContainer>
      )
    },
  ], [props.data, playerQuery])
}

export default withCommonTabsViewScreen(useViewLayoutHook, 'user', Actions)
