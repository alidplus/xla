
import React from "react";
import SelectField from "components/form/SelectField";
import JdateField from "components/form/JdateField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useRefereeOptionsProvider from "src/referees/hooks/useOptionsProvider";
import TextField from "components/form/TextField";

const Form = ({ register, control, data }) => {
  return (
    <>
      <TextField label="title" {...register("title")}/>
      <TextField label="briefNews" {...register("briefNews")}/>
      <textarea label="text" {...register("text")}/>
      <JdateField label="Time" {...register("startTime")} />
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
