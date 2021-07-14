import {Avatar, ModalFooter} from "atoms";
import TextField from "components/form/TextField";
import RateField from "components/form/RateField"
import FsUploader from "components/FsUploader";
import React from "react";

const Form = ({ register, control, data }) => {
  return (
    <>
      <FsUploader
        label="Avatar"
        target={data?._id}
        model="referees"
        pathname="avatar"
        count={1}
        accept="image/*"
        thumbNail={<Avatar circle size="100px" className="mx-1"/>}
      />
      <TextField label="Name" {...register("name")} />
      <RateField label="lvl" {...register("lvl")} />
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
