import React from 'react'
import PropTypes from 'prop-types'
import {Button} from "../atoms";
import {useForm} from "react-hook-form";
import loginSchema, { options } from '@xla/schemas/login'
import { joiResolver } from '@hookform/resolvers/joi';
import TextField from "../components/TextField";
import {DevTool} from "@hookform/devtools";
import {schema} from "@xla/schemas/user";

const Form = ({ errorMessage, onSubmit }) => {
  const {register, handleSubmit, watch, formState: {errors}, control} = useForm({
    resolver: joiResolver(schema, options)
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" errors={errors} {...register("email")} />
      <TextField label="Password" errors={errors} {...register("password")} />
      <hr/>
      <Button color="primary" type="submit">Login</Button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <DevTool control={control} />
    </form>
  )
}

export default Form

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
