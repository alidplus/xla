import React from "react";
import CustomSelectField from "../../../components/form/CustomSelectField";
import useTeamOptionsProvider from "../../teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "../../leagues/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  return (
    <>
      <CustomSelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
      <CustomSelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
    </>
  )
}

export default Form
