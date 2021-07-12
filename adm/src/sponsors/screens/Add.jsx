import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useForm} from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { schema, options } from '@xla/schemas/src/sponsor'
import {Button, Avatar, ModalHeader, ModalBody, ModalFooter} from "atoms";
import getByDot from 'lodash/get'
import Form from './Form'
import Id from 'components/Id'

const Add = ({ handleSubmit, handleRemove, handleError, id, data, dismiss, closeBtn, toggleFullBtn }) => {
  const {
    register: formRegister,
    handleSubmit: onSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset,
  } = useForm({
    defaultValues: data,
    resolver: joiResolver(schema, options)
  });
  useEffect(() => reset(data), [data])
  const register = (name) => ({
    defaultValue: getByDot(data, name),
    errors,
    control,
    setValue,
    getValues,
    ...formRegister(name)
  })
  return (
    <form onSubmit={onSubmit(handleSubmit, handleError)} className="h-100 d-flex flex-column">
      <ModalHeader className="d-block p-0" tag="div">
        <div className="d-flex justify-content-between align-items-center">
          {toggleFullBtn}
          <span>Add new sponsor</span>
          {closeBtn}
        </div>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form register={register} data={data} control={control}/>
      </ModalBody>
      <ModalFooter className="p-0">
        <Button color="primary" type="submit">Save</Button>
      </ModalFooter>
    </form>
  )
}

Add.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
}

export default Add
