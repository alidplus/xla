import { DropdownItem } from "atoms";
import { Ban, Users, Plus, FaStack } from "atoms/icons";
import TeamIcon from "src/teams/screens/Icon";
import { useHash } from "layout/HashRoutes";
import { useRouter } from "next/router";

const Actions = function Actions ({ data }) {
  const hash = useHash()
  const router = useRouter()
  const forceTeam = {
    pathname: '/teams/add/new',
    state: {
      force: {
        owner: data._id
      }
    }
  }
  const findTeams = {
    pathname: '/teams',
    query: {
      owner: data._id
    }
  }
  return (
    <>
      <DropdownItem header>{data.name} <small>{data.email}</small></DropdownItem>
      <DropdownItem onClick={e => { router.push(findTeams) }}><TeamIcon/> find teams</DropdownItem>
      <DropdownItem onClick={e => { hash.push(forceTeam) }}>
        <FaStack>
          <Users/>
          <Plus/>
        </FaStack>
        <span> Register team</span>
      </DropdownItem>
      <DropdownItem divider/>
      <DropdownItem><Ban className="text-danger" /> Disable</DropdownItem>
    </>
  )
}

export default Actions
