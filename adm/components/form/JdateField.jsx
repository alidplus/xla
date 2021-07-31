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

const JdateField = React.forwardRef(({ label, icon: Icon, errors = {}, control, setValue, getValues, name, watch, ...props }, ref) => {
  const invalid = useMemo(() => errors[props.name], [errors, props.name])
  const [value0, setValue0] = useState()
  const [x, setX] = useState(0)
  const setFieldValue = async (v, e) => {
    setValue(name, v ? v.toJSON() : null, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const setValidValue0 = v => {
    if (value) {
      const m = moment(new Date(value))
      if (m.isValid()) {
        if(props.timeBound && props.timeBound === 'start')
          setValue0(m.startOf('day'))
        else if(props.timeBound && props.timeBound === 'end')
          setValue0(m.endOf('day'))
        else
          setValue0(m)
        return
      }
    }
    setValue0(null)
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

  if (props.nativeControl) {
    return (
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
    )
  }

  return (
    <FormGroup className="mb-1">
      <Label>{label}:</Label>
      <InputGroup>
        {Icon && <InputGroupAddon addonType="prepend" className="py-1 px-2 border"><Icon/></InputGroupAddon>}
        <div className="form-control">
          {x % 2 ? null : <DatePicker
            className="border-0 w-100"
            {...dpProps}
            value={value0}
            timePickerComponent={e => null}
            onChange={setFieldValue.bind({})}
            isGregorian={false}
            persianDigits={false}
          />}
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
