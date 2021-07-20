import React, { useState } from 'react'
import {AngleDown, AngleUp, Edit, Eye, Plus, Trash} from "../atoms/icons";
import { Button, ButtonDropdown, ButtonGroup, DropdownMenu, DropdownToggle } from "../atoms";
import classnames from "classnames";
import { useHash } from "layout/HashRoutes";

const ControlToolbar = function ControlToolbar({ children, data = null, className, openUp, ...configs }) {
  const { hideAdd = false, hideEdit = false, hideView = false, hideRemove = false } = configs
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  const hash = useHash()
  const model = (data?.__model || '').replace('__', '')
  const r2new = `/${model}/add/new`
  const r2edit = `/${model}/edit/${data?._id}`
  const r2view = `/${model}/view/${data?._id}`
  const r2remove = `/${model}/remove/${data?._id}`
  if (!data) return null
  return (
    <ButtonGroup className={classnames('', className)}>
      {!children ? null : <ButtonGroup>
        <ButtonDropdown color="" isOpen={isOpen} toggle={toggle} direction={openUp ? 'up' : 'down'}>
          <DropdownToggle color="" className="px-0">{openUp ? <AngleUp fw/> : <AngleDown fw/>}</DropdownToggle>
          <DropdownMenu>
            {React.cloneElement(children, { data })}
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>}
      {hideAdd ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2new)}>
        <Plus fw/>
      </Button>}
      {hideEdit ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2edit)}>
        <Edit fw/>
      </Button>}
      {hideView ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2view)}>
        <Eye fw/>
      </Button>}
      {hideRemove ? null : <Button color="" size="sm" className="btn-icon" onClick={e => hash.push(r2remove)}>
        <Trash fw/>
      </Button>}
    </ButtonGroup>
  )
}

export default ControlToolbar
