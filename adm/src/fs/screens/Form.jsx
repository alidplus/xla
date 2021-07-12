import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm} from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { DevTool } from "@hookform/devtools";
import {Button} from "atoms";
import getByDot from 'lodash/get'
import FileField from "components/FileField";


const Form = ({ onSubmit, onError, defaultValues }) => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues,
  });
  useEffect(() => reset(defaultValues), [defaultValues])
  const register = (name) => ({
    defaultValue: getByDot(defaultValues, name),
    errors,
    control,
    setValue,
    ...formRegister(name)
  })
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FileField label="Media" {...register("file")} />
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
