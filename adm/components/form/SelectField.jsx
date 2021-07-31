import React, { useState, useMemo, useRef } from 'react'
import {
  FormGroup, Input, InputGroup, InputGroupAddon, Label, InputGroupText,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Button, Badge
} from 'atoms';
import Pagination from "../Pagination";
import {Trash, Times} from 'atoms/icons'
import { ErrorMessage } from '@hookform/error-message';
import { nullProvider } from 'lib/optionsProvider'
import Select from 'react-select';

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? '#111111'
        : isSelected
          ? '#375a7f'
          : isFocused
            ? '#375a7f'
            : '#111111',
    };
  }
};

const SelectField = React.forwardRef(({label, icon: Icon, errors = {}, control, setValue, getValues, provider : useProvider = nullProvider, name, query = null, disabled }, ref) => {
  const invalid = useMemo(() => errors[name], [errors, name])
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const setFieldValue = async (opt, e) => {
    setValue(name, opt.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const { options, searchProps, paginateProps, selected } = useProvider(query, getValues(name))

  const loadOptions = useMemo(() => {
    return options.map(o => ({ ...o, value: o._id }))//.concat(selected)
  }, [options, selected])
  return (
    <FormGroup>
      <Label>{label}:</Label>
      <Select
        options={loadOptions}
        defaultOptions
        value={selected}
        isDisabled={disabled}
        onChange={setFieldValue}
        styles={colourStyles}
        onInputChange={searchProps.onChange}
      />
      {/*<input {...props} ref={ref} type="text" className="d-none"/>*/}
      {/*<Dropdown isOpen={searchFocus || dropdownOpen} toggle={toggle} className="">
        <DropdownToggle tag="div">
          <InputGroup className="w-100 d-flex">
            {Icon && <InputGroupAddon addonType="prepend" className="d-flex justify-content-center align-items-center px-2 border"><Icon/></InputGroupAddon>}
            {selected && <div className="form-control text-end d-flex" onClick={setFieldValue.bind({}, null)}>
              <Badge className="bg-success text-dark flex-grow-1">{selected.label}</Badge>
              <Badge className="bg-success text-dark"><Times/></Badge>
            </div>}
            <Input placeholder="type to search" {...searchProps} onFocus={e => setSearchFocus(true)} onBlur={e => setSearchFocus(false)} disabled={disabled}/>
          </InputGroup>
        </DropdownToggle>
        <DropdownMenu className="shadow w-100">
          {options.map(opt => (
            <DropdownItem key={opt._id} onClick={setFieldValue.bind({}, opt._id)}>{opt.label}</DropdownItem>
          ))}
          {paginateProps && <Pagination {...paginateProps} listClassName="mb-0 mx-2"/>}
        </DropdownMenu>
      </Dropdown>*/}
      <ErrorMessage errors={errors} name={name} />
    </FormGroup>
  )
})

SelectField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

SelectField.defaultProps = {
  // ...FormGroup.defaultProps,
}

export default SelectField
