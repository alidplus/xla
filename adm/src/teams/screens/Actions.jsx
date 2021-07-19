import { DropdownItem } from "atoms";
import LeagueIcon from "src/leagues/screens/Icon";
import { useHash } from 'layout/HashRoutes'

const Actions = function Actions ({ data }) {
  const hash = useHash()
  return (
    <>
      <DropdownItem header>{data.title?.fa}</DropdownItem>
      <DropdownItem onClick={e => { hash.push(`/teams/${data._id}/join`) }}><LeagueIcon /> Join a league</DropdownItem>
    </>
  )
}

export default Actions
