import React, { useState, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup, Input, InputGroup, InputGroupAddon, Label, InputGroupText,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Button, Badge
} from 'atoms';
import Pagination from "../Pagination";
import {Trash, Times} from 'atoms/icons'
import { ErrorMessage } from '@hookform/error-message';
import { nullProvider } from 'lib/optionsProvider'

const CustomSelectField = React.forwardRef(({label, icon: Icon, errors = {}, control, setValue, getValues, provider : useProvider = nullProvider, name }, ref) => {
  const invalid = useMemo(() => errors[name], [errors, name])
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const setFieldValue = async (id, e) => {
    setValue(name, id, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const { options, searchProps, paginateProps, selected } = useProvider(null, getValues(name))
  return (
    <FormGroup>
      <Label>{label}:</Label>
      {/*<input {...props} ref={ref} type="text" className="d-none"/>*/}
      <Dropdown isOpen={searchFocus || dropdownOpen} toggle={toggle} className="">
        <DropdownToggle tag="div">
          <InputGroup className="w-100 d-flex">
            {Icon && <InputGroupAddon addonType="prepend" className="d-flex justify-content-center align-items-center px-2 border"><Icon/></InputGroupAddon>}
            {selected && <div className="form-control text-end d-flex" onClick={setFieldValue.bind({}, null)}>
              <Badge className="bg-success text-dark flex-grow-1">{selected.label}</Badge>
              <Badge className="bg-success text-dark"><Times/></Badge>
            </div>}
            <Input placeholder="type to search" {...searchProps} onFocus={e => setSearchFocus(true)} onBlur={e => setSearchFocus(false)}/>
          </InputGroup>
        </DropdownToggle>
        <DropdownMenu className="shadow w-100">
          {options.map(opt => (
            <DropdownItem key={opt._id} onClick={setFieldValue.bind({}, opt._id)}>{opt.label}</DropdownItem>
          ))}
          {paginateProps && <Pagination {...paginateProps} listClassName="mb-0 mx-2"/>}
        </DropdownMenu>
      </Dropdown>
      <ErrorMessage errors={errors} name={name} />
    </FormGroup>
  )
})

CustomSelectField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

CustomSelectField.defaultProps = {
  // ...FormGroup.defaultProps,
}

export default CustomSelectField
