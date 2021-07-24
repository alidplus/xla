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
  { _id: 'timeUp', label: 'پایان بازی' }
  // { _id: 'MOTM', label: 'بهترین بازیکن مسابقه' }
]

const Form = ({ register, control, data, getValues }) => {
  const model = getValues('model')
  const league = getValues('league')
  const matchQuery = useMemo(() => ({ league }), [])
  return (
    <>
      <CustomSelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
      <CustomSelectField label="Match" {...register("match")} provider={useMatchOptionsProvider.bind({}, matchQuery)}/>
      <TextField label="Time" type="number" min="0" max="120s" {...register("time")} />
      <CustomSelectField label="Type" {...register("eType")} provider={arrayProvider(eTypes)}/>
      <TextField label="Team" {...register("team")} />
      <CustomSelectField label="Player" {...register("player")} provider={usePlayerOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
