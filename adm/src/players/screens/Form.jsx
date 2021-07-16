import {Avatar, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import FsUploader from "components/FsUploader";
import React, { useState } from "react";
import CustomSelectField from "components/form/CustomSelectField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import JdateField from "components/form/JdateField";
import classnames from "classnames";

const evVarieties = [
  { _id: 'score', label: 'گل' },
  { _id: 'fool', label: 'خطا' },
]

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
          <TextField label="No#" {...register("no")} />
          <JdateField label="Birth Date" type="date" {...register("bDate")} />
          <CustomSelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
        </TabPane>
        <TabPane tabId="2">
          <FsUploader
            label="Avatar"
            target={data?._id}
            model="players"
            pathname="avatar"
            count={1}
            accept="image/*"
            thumbNail={<Avatar circle size="100px" className="mx-1"/>}
          />
          <FsUploader
            label="Body Shape"
            target={data?._id}
            model="players"
            pathname="shape"
            count={1}
            accept="image/*"
            thumbNail={<Avatar size="100px" className="mx-1"/>}
          />
          <FsUploader
            label="Gallery"
            target={data?._id}
            model="players"
            pathname="gallery"
            count={5}
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
