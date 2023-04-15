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

const FileField = React.forwardRef(({ label, icon: Icon, errors = {}, control, setValue, getValues, ...props }, ref) => {
  const invalid = useMemo(() => errors[props.name], [errors, props.name])
  return (
    <FormGroup>
      <Label>{label}:</Label>
      <InputGroup>
        {Icon && <InputGroupAddon addonType="prepend"><Icon/></InputGroupAddon>}
        <Input type="file" {...props} innerRef={ref} invalid={!!invalid}/>
      </InputGroup>
      <ErrorMessage errors={errors} name={props.name} />
    </FormGroup>
  )
})

export default FileField

FileField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

FileField.defaultProps = {
  // ...FormGroup.defaultProps,
}
