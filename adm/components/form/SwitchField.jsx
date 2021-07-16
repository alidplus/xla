import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup, InputGroup, InputGroupAddon, Label,
  ButtonGroup, Button
} from 'atoms';
import { ErrorMessage } from '@hookform/error-message';

const SwitchField = React.forwardRef(({ label, icon: Icon, errors = {}, control, setValue, getValues, name, trueLabel = 'Yes', falseLabel = 'No', ...props }, ref) => {
  const invalid = useMemo(() => errors[props.name], [errors, props.name])
  const setFieldValue = async (v, e) => {
    setValue(name, v, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }
  const value = getValues(name)
  return (
    <FormGroup className="mb-1">
      <Label>{label}:</Label>
      <InputGroup>
        {Icon && <InputGroupAddon addonType="prepend"><Icon/></InputGroupAddon>}
        <ButtonGroup className="btn-group-sm w-100">
          <Button outline={value === false} type="button" color="primary" onClick={setFieldValue.bind({}, true)}>
            {trueLabel}
          </Button>
          <Button outline={value === true} type="button" color="primary" onClick={setFieldValue.bind({}, false)}>
            {falseLabel}
          </Button>
        </ButtonGroup>
        {/*<Input {...props} type="checkbox" innerRef={ref} invalid={!!invalid}/>*/}
      </InputGroup>
      <ErrorMessage errors={errors} name={props.name} />
    </FormGroup>
  )
})

export default SwitchField

SwitchField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

SwitchField.defaultProps = {
  // ...FormGroup.defaultProps,
}
