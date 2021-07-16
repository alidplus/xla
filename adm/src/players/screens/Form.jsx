import {Avatar, Row, Col} from "atoms";
import TextField from "components/form/TextField";
import FsUploader from "components/FsUploader";
import React from "react";
import CustomSelectField from "components/form/CustomSelectField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import JdateField from "components/form/JdateField";

const evVarieties = [
  { _id: 'score', label: 'گل' },
  { _id: 'fool', label: 'خطا' },
]

const Form = ({ register, control, data }) => {
  return (
    <Row>
      <Col>
        <TextField label="Name" {...register("name")} />
        <TextField label="No#" {...register("no")} />
        <JdateField label="Birth Date" type="date" {...register("bDate")} />
        <CustomSelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
      </Col>
      <Col className={data?._id ? '' : 'd-none'}>
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
      </Col>
    </Row>
  )
}

export default Form
