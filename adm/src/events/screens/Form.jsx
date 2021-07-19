import TextField from "components/form/TextField";
import React, {useMemo} from "react";
import CustomSelectField from "components/form/CustomSelectField";
import {arrayProvider} from 'lib/optionsProvider'
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useMatchOptionsProvider from "src/matches/hooks/useOptionsProvider";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import usePlayerOptionsProvider from "src/players/hooks/useOptionsProvider";

const eTypes = [
  { _id: 'goal', label: 'گل' },
  { _id: 'yellowCard', label: 'کارت زرد' },
  { _id: 'redCard', label: 'کارت قرمز' },
  { _id: 'MOTM', label: 'بهترین بازیکن مسابقه' }
]

const Form = ({ register, control, data, getValues }) => {
  const model = getValues('model')
  return (
    <>
      <CustomSelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
      <CustomSelectField label="Match" {...register("match")} provider={useMatchOptionsProvider}/>
      <TextField label="Time" type="number" min="0" max="120s" {...register("time")} />
      <CustomSelectField label="Type" {...register("eType")} provider={arrayProvider(eTypes)}/>
      <CustomSelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
      <CustomSelectField label="Player" {...register("player")} provider={usePlayerOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
