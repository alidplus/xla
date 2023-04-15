import {Avatar, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import SwitchField from "components/form/SwitchField";
import FsUploader from "components/FsUploader";
import React, { useState } from "react";
import SelectField from "components/form/SelectField";
import useSponsorOptionsProvider from "src/sponsors/hooks/useOptionsProvider";
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
          <TextField label="Title" {...register("title")} />
          <TextField label="Description" {...register("text")} />
          <SwitchField label="Home Away?" {...register("homeAway")} falseLabel="Single Match" trueLabel="Home Away"/>
          <TextField label="Teams" {...register("teams")} />
          <SelectField label="Sponsor" {...register("sponsor")} provider={useSponsorOptionsProvider}/>
        </TabPane>
        <TabPane tabId="2">
          <FsUploader
            label="Symbol"
            target={data?._id}
            model="leagues"
            pathname="symbol"
            count={1}
            accept="image/*"
            thumbNail={<Avatar circle size="100px" className="mx-1"/>}
          />
          <FsUploader
            label="Gallery"
            target={data?._id}
            model="leagues"
            pathname="gallery"
            count={10}
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
