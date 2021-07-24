
import React from "react";
import CustomSelectField from "components/form/CustomSelectField";
import JdateField from "components/form/JdateField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useRefereeOptionsProvider from "src/referees/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  return (
    <>
      <JdateField label="Time" type="date" {...register("startTime")} />
      <CustomSelectField label="Home" {...register("home")} provider={useTeamOptionsProvider}/>
      <CustomSelectField label="Away" {...register("away")} provider={useTeamOptionsProvider}/>
      <CustomSelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
      <CustomSelectField label="Referee" {...register("referee")} provider={useRefereeOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
