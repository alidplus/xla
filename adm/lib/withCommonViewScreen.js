import React from 'react'
import {ModalHeader, ModalBody, ModalFooter} from "atoms";
import Id from "components/Id";
import ControlToolbar from "components/ControlToolbar";

const withCommonViewScreen = function withCommonViewScreen (Component, title = '', ExtraActions) {
  return ({ data, closeBtn, toggleFullBtn, ...restprops }) => {
    return (
      <div className="h-100 d-flex flex-column">
        <ModalHeader className="d-block p-0" tag="div">
          <div className="d-flex justify-content-between align-items-center">
            {toggleFullBtn}
            <span>View {title} <Id type="event" data={data}/></span>
            {closeBtn}
          </div>
        </ModalHeader>
        <ModalBody className="p-0 flex-grow-1 -d-flex justify-content-center align-items-center">
          <Component {...restprops} data={data}/>
        </ModalBody>
        <ModalFooter className="p-0">
          {!ExtraActions ? (
            <ControlToolbar data={data} className="border-dark"/>
          ) : (
            <ControlToolbar data={data} className="border-dark" openUp><ExtraActions /></ControlToolbar>
          )}
        </ModalFooter>
      </div>
    )
  }
}

export default withCommonViewScreen
