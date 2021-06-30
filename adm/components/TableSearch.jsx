import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'atoms';
import { Search as SearchIcon } from 'atoms/icons';

const TableSearch = ({ keyword, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Search: </InputGroupAddon>
          <Input defaultValue={keyword} name="keyword"/>
          <InputGroupAddon addonType="append" tag={Button} color="primary" className="btn-icon py-0">
            <SearchIcon/>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
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
