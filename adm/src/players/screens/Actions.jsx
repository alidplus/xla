import { DropdownItem } from "atoms";
import { useRouter } from "next/router";

const Actions = function Actions ({ data }) {
  const router = useRouter()
  const findplayers = {
    pathname: '/players',
    query: {
      team: data.team
    }
  }
  return (
    <>
      <DropdownItem onClick={e => { router.push(findplayers) }}>Teammates</DropdownItem>
    </>
  )
}

export default Actions
