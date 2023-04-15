
import React from "react";
import SelectField from "components/form/SelectField";
import JdateField from "components/form/JdateField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useRefereeOptionsProvider from "src/referees/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  return (
    <>
      <JdateField label="Time" {...register("startTime")} />
      <SelectField label="Home" {...register("home")} provider={useTeamOptionsProvider}/>
      <SelectField label="Away" {...register("away")} provider={useTeamOptionsProvider}/>
      <SelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
      <SelectField label="Referee" {...register("referee")} provider={useRefereeOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
