
import React from "react";
import SelectField from "components/form/SelectField";
import JdateField from "components/form/JdateField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useRefereeOptionsProvider from "src/referees/hooks/useOptionsProvider";
import TextField from "../../../components/form/TextField";
import {TabPane} from "../../../atoms";

const Form = ({ register, control, data }) => {
  return (
    <>
      <TextField label="Title" {...register("title")} />
      <TextField label="Slug" {...register("slug")} disabled />
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
