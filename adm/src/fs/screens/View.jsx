import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Button, Avatar, ModalHeader, ModalBody, ModalFooter} from "atoms";
import Card from './Card'
import Id from "../../../components/Id";

const Edit = ({ handleSubmit, handleRemove, handleError, id, data, dismiss, closeBtn, toggleFullBtn }) => {
  return (
    <div className="h-100 d-flex flex-column">
      <ModalHeader className="d-block p-0" tag="div">
        <div className="d-flex justify-content-between align-items-center">
          {toggleFullBtn}
          <span>View f <Id type="f" data={data}/></span>
          {closeBtn}
        </div>
      </ModalHeader>
      <ModalBody className="p-0 flex-grow-1">
        <Card data={data}/>
      </ModalBody>
      {/*<ModalFooter>
        <Button color="primary" type="submit">Save</Button>
      </ModalFooter>*/}
    </div>
  )
}

Edit.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
}

export default Edit
