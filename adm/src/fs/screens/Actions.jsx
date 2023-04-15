import { DropdownItem } from "atoms";

const Actions = function Actions ({ data }) {
  return (
    <>
      <DropdownItem header>Header</DropdownItem>
      <DropdownItem disabled>Action</DropdownItem>
      <DropdownItem>Another Action</DropdownItem>
      <DropdownItem divider/>
      <DropdownItem>Another Action</DropdownItem>
    </>
  )
}

export default Actions
