import React, {useEffect} from 'react'
import {ModalHeader, ModalBody, ModalFooter, Col, Button} from "atoms";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {options, schema} from "@xla/schemas/src/user";
import getByDot from "lodash/get";
import Form from "../src/users/screens/Form";

const emptryDefaultValues = {}

const withCommonAddScreen = function withCommonAddScreen (Card, Form, schema, schemaOptions, title = '') {
  return ({ handleSubmit, handleError, data, closeBtn, toggleFullBtn, hash }) => {
    const defaultValues = hash.location?.state?.force ?? emptryDefaultValues
    const {
      register: formRegister,
      handleSubmit: onSubmit,
      formState: { errors },
      setValue,
      getValues,
      watch,
      control,
      reset,
    } = useForm({
      defaultValues,
      resolver: joiResolver(schema, schemaOptions)
    });

    useEffect(() => {
      reset(defaultValues)
    }, [defaultValues])

    const register = (name) => ({
      defaultValue: getByDot(defaultValues, name, ''),
      errors,
      control,
      setValue,
      getValues,
      watch,
      disabled: defaultValues.hasOwnProperty(name),
      ...formRegister(name)
    })
    const preview = watch()
    return (
      <form onSubmit={onSubmit(handleSubmit, handleError)} className="h-100 d-flex flex-column">
        <ModalHeader className="d-block p-0" tag="div">
          <div className="d-flex justify-content-between align-items-center">
            {toggleFullBtn}
            <span>Add new {title}</span>
            {closeBtn}
          </div>
        </ModalHeader>
        <ModalBody className="flex-grow-1 row align-items-start">
          <Col sm="4" className="position-sticky top-0">
            <h5>Preview</h5>
            <Card data={preview}/>
          </Col>
          <Col sm="8">
            <Form register={register} control={control} getValues={getValues} errors={errors}/>
          </Col>
        </ModalBody>
        <ModalFooter className="p-0">
          <Button color="primary" type="submit">Save</Button>
        </ModalFooter>
      </form>
    )
  }
}

export default withCommonAddScreen
