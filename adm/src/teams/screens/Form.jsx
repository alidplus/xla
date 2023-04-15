import { useState } from 'react'
import {Avatar, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import FsUploader from "components/FsUploader";
import React from "react";

import SelectField from "components/form/SelectField";
import useUserOptionsProvider from 'src/users/hooks/useOptionsProvider'
import classnames from "classnames";

const flagAvatar = <Avatar circle size="100px" className="mx-1"/>
const galleryAvatar = <Avatar size="100px" className="mx-1"/>

const Form = ({ register, control, data }) => {
  const [activeTab, setActiveTab] = useState('1')
  console.log(data, '')
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
          <SelectField label="Owner" {...register("owner")} provider={useUserOptionsProvider}/>
        </TabPane>
        <TabPane tabId="2">
          <FsUploader
            label="Flag"
            target={data?._id}
            model="teams"
            pathname="flag"
            count={1}
            accept="image/*"
            thumbNail={flagAvatar}
          />
          <FsUploader
            label="Gallery"
            target={data?._id}
            model="teams"
            pathname="gallery"
            count={2}
            accept="image/*"
            thumbNail={galleryAvatar}
          />
        </TabPane>
      </TabContent>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
