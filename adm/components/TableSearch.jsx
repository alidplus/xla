import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {useForm} from "react-hook-form";
import {
  FormGroup, Input, InputGroup, InputGroupAddon, Label,
  Row, Col,
  Button,
  Modal, ModalBody, ModalFooter, ModalHeader
} from 'atoms';
import { Search as SearchIcon, SearchenginBrand } from 'atoms/icons';
import getByDot from "lodash/get";
import JdateField from "./form/JdateField";

const TableSearch = ({ filters, onSubmit, Form }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset,
    watch
  } = useForm({
    defaultValues: filters
  });

  useEffect(() => reset(filters), [filters])

  const register = (name) => ({
    defaultValue: getByDot(filters, name, ''),
    errors,
    control,
    setValue,
    getValues,
    watch,
    ...formRegister(name)
  })

  const keyword = watch('keyword')
  const setKeyword = e => {
    setValue('keyword', e.target.value)
  }

  const clearSearch = () => {
    onSubmit({})
  }

  const closeBtn = <Button color="" className="btn btn-close" onClick={toggle}/>;
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="pagination-search-form">
      <FormGroup className="mb-2">
        <InputGroup>
          <InputGroupAddon addonType="prepend">Search: </InputGroupAddon>
          <Input value={keyword} onChange={setKeyword} disabled={modal}/>
          <InputGroupAddon addonType="append" tag={Button} color="primary" className="btn-icon py-0">
            <SearchIcon/>
          </InputGroupAddon>
          <InputGroupAddon type="button" addonType="append" tag={Button} color="secondary" className="btn-icon py-0" onClick={toggle}>
            <SearchenginBrand/>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>

      <Modal isOpen={modal} toggle={toggle} centered container="pagination-search-form">
        <ModalHeader toggle={toggle} close={closeBtn}><SearchenginBrand/>  Advanced Search</ModalHeader>
        {modal && (
          <ModalBody>
            <FormGroup className="mb-2">
              <Label>Keyword: {keyword}</Label>
              <Input value={keyword} onChange={setKeyword}/>
            </FormGroup>
            <FormGroup className="mb-2">
              <Label>Created At: </Label>
              <InputGroup>
                <JdateField {...register("createdAt__$gte")} nativeControl removable timeBound="start" timePicker={false}/>
                <InputGroupAddon addonType="prepend">to</InputGroupAddon>
                <JdateField {...register("createdAt__$lte")} nativeControl removable timeBound="end" timePicker={false}/>
              </InputGroup>
            </FormGroup>
            {Form ? <Form register={register} control={control} getValues={getValues} errors={errors}/> : null}
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="primary">Search</Button>{' '}
          <Button color="secondary" type="reset" onClick={clearSearch}>Clear</Button>
        </ModalFooter>
      </Modal>
    </form>
  )
}

export default TableSearch

TableSearch.propTypes = {
  ...FormGroup.propTypes,
  onSubmit: PropTypes.func.isRequired,
  keyword: PropTypes.string
}

TableSearch.defaultProps = {
  ...FormGroup.defaultProps,
  keyword: ""
}
