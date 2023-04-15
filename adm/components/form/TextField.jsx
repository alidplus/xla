import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'atoms';
import { ErrorMessage } from '@hookform/error-message';

const TextField = React.forwardRef(({ label, icon: Icon, errors = {}, control, setValue, getValues, ...props }, ref) => {
  const invalid = useMemo(() => errors[props.name], [errors, props.name])
  return (
    <FormGroup className="mb-1">
      <Label>{label}:</Label>
      <InputGroup>
        {Icon && <InputGroupAddon addonType="prepend"><Icon/></InputGroupAddon>}
        <Input {...props} innerRef={ref} invalid={!!invalid}/>
      </InputGroup>
      <div className="text-warning"><ErrorMessage as="span" errors={errors} name={props.name} /></div>
    </FormGroup>
  )
})

export default TextField

TextField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

TextField.defaultProps = {
  // ...FormGroup.defaultProps,
}
