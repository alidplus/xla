import { DropdownItem } from "atoms";
import LeagueIcon from "src/leagues/screens/Icon";
import { useHash } from 'layout/HashRoutes'
import { useRouter } from "next/router";
import PlayerIcon from "src/players/screens/Icon";
import { Users, Plus, FaStack } from "atoms/icons";



const Actions = function Actions ({ data }) {
  const hash = useHash()
  const router = useRouter()
  const forcePlayers = {
    pathname: '/players/add/new',
    state: {
      force: {
        team: data._id
      }
    }
  }
  const findplayers = {
    pathname: '/players',
    query: {
      team: data._id
    }
  }
  return (
    <>
      <DropdownItem header>{data.title?.fa}</DropdownItem>
      <DropdownItem onClick={e => { router.push(findplayers) }}><PlayerIcon/> find player</DropdownItem>
      <DropdownItem onClick={e => { hash.push(forcePlayers) }}>
        <FaStack>
          <Users/>
          <Plus/>
        </FaStack>
        <span> Register player</span>
      </DropdownItem>
      <DropdownItem onClick={e => { hash.push(`/teams/${data._id}/join`) }}><LeagueIcon /> Join a league</DropdownItem>
    </>
  )
}

export default Actions
