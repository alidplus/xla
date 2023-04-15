import React, {useEffect} from 'react'
import Card, {ModalHeader, ModalBody, ModalFooter, Col, Button} from "atoms";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {options, schema} from "@xla/schemas/src/user";
import getByDot from "lodash/get";
import Form from "../src/users/screens/Form";

const withCommonEditScreen = function withCommonEditScreen (Card, Form, schema, schemaOptions, title = '') {
  return ({ handleSubmit, handleError, data, closeBtn, toggleFullBtn }) => {
    // if (!data) return null
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
      defaultValues: data,
      resolver: joiResolver(schema, schemaOptions)
    });
    useEffect(() => reset(data), [data])
    const register = (name) => ({
      defaultValue: getByDot(data, name, ''),
      errors,
      control,
      setValue,
      getValues,
      watch,
      ...formRegister(name)
    })
    const preview = watch()
    return (
      <form onSubmit={onSubmit(handleSubmit, handleError)} className="h-100 d-flex flex-column">
        <ModalHeader className="d-block p-0" tag="div">
          <div className="d-flex justify-content-between align-items-center">
            {toggleFullBtn}
            <span>Edit {title}</span>
            {closeBtn}
          </div>
        </ModalHeader>
        <ModalBody className="flex-grow-1 row align-items-start">
          <Col sm="4" className="position-sticky top-0">
            <h5>Preview</h5>
            <Card data={preview} className="shadow-sm"/>
          </Col>
          <Col sm="8">
            <Form register={register} data={data} control={control} getValues={getValues}/>
          </Col>
        </ModalBody>
        <ModalFooter className="p-0">
          <Button color="primary" type="submit">Save</Button>
        </ModalFooter>
      </form>
    )
  }
}

export default withCommonEditScreen
