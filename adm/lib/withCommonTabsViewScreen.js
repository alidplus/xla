import React, { useState } from 'react'
import {ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import Id from "components/Id";
import ControlToolbar from "components/ControlToolbar";
import classnames from "classnames";

const withCommonTabsViewScreen = function withCommonTabsViewScreen (useLayoutHook, title = '', ExtraActions) {
  return ({ closeBtn, toggleFullBtn, ...props }) => {
    const [activeTab, setActiveTab] = useState('default')
    const views = useLayoutHook(props)
    return (
      <div className="h-100 d-flex flex-column">
        <ModalHeader className="d-block p-0" tag="div">
          <div className="d-flex justify-content-between align-items-center">
            {toggleFullBtn}
            <span>View {title} <Id data={props.data}/></span>
            {closeBtn}
          </div>
        </ModalHeader>
        <ModalBody className="p-0 flex-grow-1 -d-flex justify-content-center align-items-center">
          <div className="d-flex h-100">
            <Nav tabs className="flex-column border-end border-start-0 border-bottom-0 border-top-0">
              {views.map(v => (
                <NavItem key={v.id}>
                  <NavLink
                    className={classnames("cursor-pointer", { active: activeTab === v.id })}
                    onClick={() => { setActiveTab(v.id); }}
                  >
                    {v.label}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab} className="flex-grow-1">
              {views.map(v => (
                <TabPane key={v.id} tabId={v.id} className="h-100">
                  <div className={v.panClassName}>
                    {React.cloneElement(v.children, props)}
                  </div>
                </TabPane>
              ))}
            </TabContent>
          </div>
        </ModalBody>
        <ModalFooter className="p-0">
          {!ExtraActions ? (
            <ControlToolbar data={props.data} className="border-dark"/>
          ) : (
            <ControlToolbar data={props.data} className="border-dark" openUp><ExtraActions /></ControlToolbar>
          )}
        </ModalFooter>
      </div>
    )
  }
}

export default withCommonTabsViewScreen
