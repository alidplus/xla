import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { DevTool } from "@hookform/devtools";
import { schema, options } from '@xla/schemas/src/user'
import {Button} from "atoms";
import getByDot from 'lodash/get'
import TextField from "components/TextField";


const Form = ({ onSubmit, onError, defaultValues }) => {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: {errors},
    control,
    reset
  } = useForm({
    defaultValues,
    resolver: joiResolver(schema, options)
  });
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])
  const register = (name) => ({
    defaultValue: getByDot(defaultValues, name),
    errors,
    control,
    ...formRegister(name)
  })
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <TextField label="Name" {...register("name")} />
      <TextField label="Mobile" {...register("mobile")} />
      <TextField label="Email" {...register("email")} />
      <hr/>
      <Button color="primary" type="submit">Save</Button>
      <DevTool control={control} />
    </form>
  )
}

export default Form

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
