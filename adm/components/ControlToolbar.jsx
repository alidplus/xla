import React, { useState } from 'react'
import {AngleDown, Edit, Eye, Plus, Trash} from "../atoms/icons";
import { Button, ButtonDropdown, ButtonGroup, DropdownMenu, DropdownToggle } from "../atoms";
import classnames from "classnames";
import { useHash } from "layout/HashRoutes";

const ControlToolbar = function ControlToolbar({ children, data = null, className, ...configs }) {
  const { hideAdd = false, hideEdit = false, hideView = false, hideRemove = false } = configs
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  if (!data) return null
  const hash = useHash()
  const model = (data.__model || '').replace('__', '')
  const r2new = `/${model}/add/new`
  const r2edit = `/${model}/edit/${data._id}`
  const r2view = `/${model}/view/${data._id}`
  const r2remove = `/${model}/remove/${data._id}`
  return (
    <ButtonGroup className={classnames('', className)}>
      <pre>{hash.location.pathname}</pre>
      {!children ? null : <ButtonGroup>
        <ButtonDropdown color="" isOpen={isOpen} toggle={toggle}>
          <DropdownToggle color="" className="px-0"><AngleDown fw/></DropdownToggle>
          <DropdownMenu>
            {React.cloneElement(children, { data })}
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>}
      {hash.location.pathname === r2new || hideAdd ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2new)}>
        <Plus fw/>
      </Button>}
      {hash.location.pathname === r2edit || hideEdit ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2edit)}>
        <Edit fw/>
      </Button>}
      {hash.location.pathname === r2view || hideView ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2view)}>
        <Eye fw/>
      </Button>}
      {hash.location.pathname === r2remove || hideRemove ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2remove)}>
        <Trash fw/>
      </Button>}
    </ButtonGroup>
  )
}

export default ControlToolbar
