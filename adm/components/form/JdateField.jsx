import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'atoms';
import moment from 'moment-jalaali'
import omit from 'lodash/omit';
import DatePicker from "react-datepicker2"
import { ErrorMessage } from '@hookform/error-message';

const JdateField = React.forwardRef(({ label, icon: Icon, errors = {}, control, setValue, getValues, name, ...props }, ref) => {
  const invalid = useMemo(() => errors[props.name], [errors, props.name])
  const [value0, setValue0] = useState()
  const setFieldValue = async (v, e) => {
    setValue(name, v ? v.toJSON() : null, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }
  const setValidValue0 = v => {
    if (value) {
      const m = moment(new Date(value))
      if (m.isValid()) {
        setValue0(m)
      }
    }
  }
  const value = getValues(name)
  useEffect(() => {
    setValidValue0(value)
  }, [value])
  useEffect(() => {
    setValidValue0(props.defaultValue)
  }, [props.defaultValue])
  const dpProps = useMemo(() => {
    return omit(props, ['defaultValue'])
  }, [props])
  return (
    <FormGroup className="mb-1">
      <Label>{label}:</Label>
      <InputGroup>
        {Icon && <InputGroupAddon addonType="prepend" className="py-1 px-2 border"><Icon/></InputGroupAddon>}
        <div className="form-control">
          <DatePicker
            className="border-0 w-100"
            {...dpProps}
            value={value0}
            onChange={setFieldValue.bind({})}
            isGregorian={false}
            persianDigits={false}
          />
        </div>
      </InputGroup>
      <ErrorMessage errors={errors} name={name} />
    </FormGroup>
  )
})

export default JdateField

JdateField.propTypes = {
  // ...FormGroup.propTypes,
  // onSubmit: PropTypes.func.isRequired,
  // keyword: PropTypes.string
}

JdateField.defaultProps = {
  // ...FormGroup.defaultProps,
}
