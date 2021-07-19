import { DropdownItem } from "atoms";
import { Ban } from "atoms/icons";

const Actions = function Actions ({ data }) {
  return (
    <>
      <DropdownItem header>{data.name} <small>{data.email}</small></DropdownItem>
      <DropdownItem>Register team</DropdownItem>
      <DropdownItem divider/>
      <DropdownItem><Ban className="text-danger" /> Disable</DropdownItem>
    </>
  )
}

export default Actions
