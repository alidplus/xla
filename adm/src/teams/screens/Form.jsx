import {Avatar, ModalFooter} from "atoms";
import TextField from "components/TextField";
import FsUploader from "components/FsUploader";
import React from "react";
import CustomSelectField from "components/CustomSelectField";
import useUserOptionsProvider from 'src/users/hooks/useOptionsProvider'

const Form = ({ register, control, data }) => {
  return (
    <>
      <FsUploader
        label="Gallery"
        target={data?._id}
        model="teams"
        pathname="gallery"
        count={2}
        accept="image/*"
        thumbNail={<Avatar size="100px" className="mx-1"/>}
      />
      <TextField label="Title Fa" {...register("title.fa")} />
      <TextField label="Title En" {...register("title.en")} />
      <TextField label="ABR" {...register("title.abr")} />
      <CustomSelectField label="Owner" {...register("owner")} provider={useUserOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
