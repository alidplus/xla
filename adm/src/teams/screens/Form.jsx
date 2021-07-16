import { useState } from 'react'
import {Avatar, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import FsUploader from "components/FsUploader";
import React from "react";
import CustomSelectField from "components/form/CustomSelectField";
import useTeamOptionsProvider from 'src/users/hooks/useOptionsProvider'
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
          <TextField label="Title Fa" {...register("title.fa")} />
          <TextField label="Title En" {...register("title.en")} />
          <TextField label="ABR" {...register("title.abr")} />
          <CustomSelectField label="Owner" {...register("owner")} provider={useTeamOptionsProvider}/>
        </TabPane>
        <TabPane tabId="2">
          <FsUploader
            label="Flag"
            target={data?._id}
            model="teams"
            pathname="flag"
            count={1}
            accept="image/*"
            thumbNail={<Avatar circle size="100px" className="mx-1"/>}
          />
          <FsUploader
            label="Gallery"
            target={data?._id}
            model="teams"
            pathname="gallery"
            count={2}
            accept="image/*"
            thumbNail={<Avatar size="100px" className="mx-1"/>}
          />
        </TabPane>
      </TabContent>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
