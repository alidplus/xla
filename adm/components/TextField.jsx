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

const TextField = React.forwardRef(({ label, icon: Icon, errors, control, ...props }, ref) => {
  const invalid = useMemo(() => errors[props.name], [errors, props.name])
  return (
    <FormGroup>
      <Label>{label}:</Label>
      <InputGroup>
        <Input {...props} innerRef={ref} invalid={!!invalid}/>
        {Icon && <InputGroupAddon addonType="append"><Icon/></InputGroupAddon>}
      </InputGroup>
      <ErrorMessage errors={errors} name={props.name} />
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
