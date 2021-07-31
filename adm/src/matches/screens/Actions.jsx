import { DropdownItem } from "atoms";
import EventIcon from "src/events/screens/Icon";
import { useHash } from 'layout/HashRoutes'

const Actions = function Actions ({ data }) {
  const hash = useHash()
  const forceEvent = {
    pathname: '/events/add/new',
    state: {
      force: {
        league: data.league,
        match: data._id,
      }
    }
  }
  const forceEndEvent = {
    pathname: '/events/add/new',
    state: {
      force: {
        league: data.league,
        match: data._id,
        eType: 'timeUp'
      }
    }
  }
  return (
    <>
      {/*<DropdownItem header>{data.title?.fa}</DropdownItem>*/}
      <DropdownItem onClick={e => { hash.push(forceEvent) }}><EventIcon /> Add Event</DropdownItem>
      <DropdownItem divider/>
      <DropdownItem onClick={e => { hash.push(forceEndEvent) }}><i className="fa fa-clock"></i> End of Match</DropdownItem>
    </>
  )
}

export default Actions
