import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { DevTool } from "@hookform/devtools";
import userSchema from 'validations/users'
import {Button} from "atoms";
import getByDot from 'lodash/get'
import TextField from "components/TextField";


const Form = ({ onSubmit, defaultValues }) => {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: {errors},
    control,
    reset
  } = useForm({
    defaultValues,
    resolver: joiResolver(userSchema)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Username" {...register("username")} />
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
