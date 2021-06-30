import React from 'react'
import PropTypes from 'prop-types'
import {Button} from "../atoms";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import userSchema from "../validations/users";
import TextField from "../components/TextField";
import {DevTool} from "@hookform/devtools";

const Form = ({ errorMessage, onSubmit }) => {
  const {register, handleSubmit, watch, formState: {errors}, control} = useForm();
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
