import {Avatar, ModalFooter} from "atoms";
import TextField from "components/TextField";
import FsUploader from "components/FsUploader";
import React from "react";
import CustomSelectField from "components/CustomSelectField";
import useSponsorOptionsProvider from "src/sponsors/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  return (
    <>
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
      <TextField label="Title" {...register("title")} />
      <TextField label="Description" {...register("text")} />
      <TextField label="Teams" {...register("teams")} />
      <CustomSelectField label="Sponsor" {...register("sponsor")} provider={useSponsorOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
