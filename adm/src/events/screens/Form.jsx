import TextField from "components/form/TextField";
import React, {useMemo} from "react";
import CustomSelectField from "components/form/CustomSelectField";
import SwitchField from "components/form/SwitchField";
import {arrayProvider} from 'lib/optionsProvider'
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useMatchOptionsProvider from "src/matches/hooks/useOptionsProvider";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import usePlayerOptionsProvider from "src/players/hooks/useOptionsProvider";

const eTypes = [
  { _id: 'goal', label: 'گل' },
  { _id: 'yc', label: 'کارت زرد' },
  { _id: 'rc', label: 'کارت قرمز' },
  { _id: 'timeUp', label: 'پایان بازی' }
  // { _id: 'MOTM', label: 'بهترین بازیکن مسابقه' }
]


const teamSwitchProps = {
  trueLabel: 'میزبان',
  falseLabel: 'میهمان',
  trueValue: 'home',
  falseValue: 'away'
}

const Form = ({ register, control, data, getValues }) => {
  const model = getValues('model')
  const league = getValues('league')
  const matchQuery = useMemo(() => ({ league }), [])
  const eType = getValues('eType')
  return (
    <>
      <CustomSelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
      <CustomSelectField label="Match" {...register("match")} provider={useMatchOptionsProvider.bind({}, matchQuery)}/>
      <CustomSelectField label="Type" {...register("eType")} provider={arrayProvider(eTypes)}/>
      { (['goal','yc','rc']).includes(eType) ? (
        <>
          <TextField label="Time" type="number" min="0" max="120s" {...register("time")} />
          <SwitchField label="Team" {...register("team")} {...teamSwitchProps} />
          <CustomSelectField label="Player" {...register("player")} provider={usePlayerOptionsProvider}/>
        </>
      ) : null}
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
