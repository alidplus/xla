import { DropdownItem } from "atoms";
import EventIcon from "src/events/screens/Icon";
import { useHash } from 'layout/HashRoutes'

const Actions = function Actions ({ data }) {
  const hash = useHash()
  const forceEvent = {
    pathname: '/leagues/add/new',
    state: {
      force: {
        sponsor: data._id,
      }
    }
  }
  return (
    <>
      <DropdownItem onClick={e => { hash.push(forceEvent) }}><EventIcon /> Add League</DropdownItem>
    </>
  )
}

export default Actions
