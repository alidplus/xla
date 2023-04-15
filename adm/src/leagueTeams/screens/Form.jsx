import React from "react";
import SelectField from "../../../components/form/SelectField";
import useTeamOptionsProvider from "../../teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "../../leagues/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  return (
    <>
      <SelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
      <SelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
    </>
  )
}

export default Form
