import {Avatar, ModalFooter} from "atoms";
import TextField from "components/TextField";
import FsUploader from "components/FsUploader";
import React from "react";
import CustomSelectField from "../../../components/CustomSelectField";
import useTeamOptionsProvider from "../../teams/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  return (
    <>
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
      <TextField label="Name" {...register("name")} />
      <TextField label="No#" {...register("no")} />
      <TextField label="Birth Date" {...register("bDate")} />
      <CustomSelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
    </>
  )
}

export default Form
