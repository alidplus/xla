import React from 'react'
import {ModalHeader, ModalBody, ModalFooter, Button} from "atoms";
import Id from "components/Id";

const withCommonRemoveScreen = function withCommonRemoveScreen (Card, title = '') {
  return ({ data, closeBtn, toggleFullBtn, handleRemove, dismiss }) => {
    return (
      <div className="h-100 d-flex flex-column">
        <ModalHeader className="d-block p-0" tag="div">
          <div className="d-flex justify-content-between align-items-center">
            {toggleFullBtn}
            <span>Remove {title} <Id type="event" data={data}/>?</span>
            {closeBtn}
          </div>
        </ModalHeader>
        <ModalBody className="p-0 flex-grow-1">
          <Card data={data}/>
        </ModalBody>
        <ModalFooter className="p-0">
          <Button color="danger" type="button" onClick={handleRemove}>Remove</Button>
          <Button color="primary" type="button" onClick={dismiss}>Cancel</Button>
        </ModalFooter>
      </div>
    )
  }
}

export default withCommonRemoveScreen
