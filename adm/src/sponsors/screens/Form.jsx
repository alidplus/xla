import {Avatar, ModalFooter} from "atoms";
import TextField from "components/TextField";
import FsUploader from "components/FsUploader";
import React from "react";

const Form = ({ register, control, data }) => {
  return (
    <>
      <FsUploader
        label="Logo"
        target={data?._id}
        model="sponsors"
        pathname="logo"
        count={1}
        accept="image/*"
        thumbNail={<Avatar size="100px" className="mx-1"/>}
      />
      <FsUploader
        label="Banner"
        target={data?._id}
        model="sponsors"
        pathname="banner"
        count={1}
        accept="image/*"
        thumbNail={<Avatar size="100px" className="mx-1"/>}
      />
      <TextField label="Title" {...register("title")} />
      <TextField label="Text" {...register("text")} />
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
