import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup, InputGroup, InputGroupAddon, Label,
  ButtonGroup, Button
} from 'atoms';
import { Star, StarO } from 'atoms/icons'
import { ErrorMessage } from '@hookform/error-message';

const rateLevels = [1,2,3,4,5]

const RateField = React.forwardRef(({ label, icon: Icon, errors = {}, control, setValue, getValues, name, ...props }, ref) => {
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
          <Button outline={value > 0} className="btn-icon" type="button" color="light" onClick={setFieldValue.bind({}, 0)}>
            No
          </Button>
          {rateLevels.map(rl => (
            <Button key={rl} outline={value < rl} className="btn-icon" type="button" color="light" onClick={setFieldValue.bind({}, rl)}>
              <Star/>
            </Button>
          ))}
        </ButtonGroup>
        {/*<Input {...props} type="checkbox" innerRef={ref} invalid={!!invalid}/>*/}
      </InputGroup>
      <ErrorMessage errors={errors} name={props.name} />
    </FormGroup>
  )
})

export default RateField

RateField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

RateField.defaultProps = {
  // ...FormGroup.defaultProps,
}
