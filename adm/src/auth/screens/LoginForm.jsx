import React from 'react'
import PropTypes from 'prop-types'
import {Button} from "../../../atoms";
import {useForm} from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import TextField from "../../../components/TextField";
import {DevTool} from "@hookform/devtools";
import {schema, options} from "@xla/schemas/src/login";

const LoginForm = ({ errorMessage, onSubmit }) => {
  const {register, handleSubmit, control} = useForm({
    resolver: joiResolver(schema, options)
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" {...register("email")} />
      <TextField label="Password" {...register("password")} />
      <hr/>
      <Button color="primary" type="submit">Login</Button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <DevTool control={control} />
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
