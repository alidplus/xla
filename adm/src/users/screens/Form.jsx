import React, { useState } from "react";
import {Avatar, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import FsUploader from "components/FsUploader";
import classnames from "classnames";

const Form = ({ register, control, data }) => {
  const [activeTab, setActiveTab] = useState('1')
  return (
    <>
      <Nav tabs className="border-bottom border-dark">
        <NavItem>
          <NavLink
            className={classnames("cursor", { active: activeTab === '1' })}
            onClick={() => { setActiveTab('1'); }}
          >
            General
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { setActiveTab('2'); }}
          >
            Images
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <TextField label="Name" {...register("name")} />
          <TextField label="Mobile" {...register("mobile")} />
          <TextField label="Email" {...register("email")} />
        </TabPane>
        <TabPane tabId="2">
          <FsUploader
            label="Avatar"
            target={data?._id}
            model="users"
            pathname="avatar"
            count={1}
            accept="image/*"
            thumbNail={<Avatar circle size="100px" className="mx-1"/>}
          />
        </TabPane>
      </TabContent>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
