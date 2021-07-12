import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'atoms';
import { Eye, Trash, Edit, AngleDown } from 'atoms/icons';
import { useHash } from "../layout/HashRoutes";

const TableActions = ({ data, children, route = '' }) => {
  const hash = useHash()
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  return (
    <ButtonGroup>
      {!children ? null : <ButtonGroup>
        <ButtonDropdown isOpen={isOpen} toggle={toggle}>
          <DropdownToggle color="secondary" className="px-0"><AngleDown fw/></DropdownToggle>
          <DropdownMenu>
            {children}
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>}
      <Button size="sm" className="btn-icon" onClick={e => hash.push(`/${route}/edit/${data._id}`)}>
        <Edit fw />
      </Button>
      <Button size="sm" className="btn-icon" onClick={e => hash.push(`/${route}/view/${data._id}`)}>
        <Eye fw />
      </Button>
      <Button size="sm" className="btn-icon" onClick={e => hash.push(`/${route}/remove/${data._id}`)}>
        <Trash fw />
      </Button>
    </ButtonGroup>
  )
}

export default TableActions

TableActions.propTypes = {
  data: PropTypes.object.isRequired
}

/*TableActions.defaultProps = {
}*/
