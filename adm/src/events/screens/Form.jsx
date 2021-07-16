import TextField from "components/form/TextField";
import React, {useMemo} from "react";
import CustomSelectField from "../../../components/form/CustomSelectField";
import useTeamOptionsProvider from "../../teams/hooks/useOptionsProvider";
import {arrayProvider} from 'lib/optionsProvider'

const evVarieties = [
  { _id: 'score', label: 'گل' },
  { _id: 'fool', label: 'خطا' },
]
const modelVarieties = (['users', 'leagues', 'teams', 'referees', 'sponsors', 'players', 'matches', 'events']).map(m => ({
  _id: m,
  label: m
}))

const Form = ({ register, control, data, getValues }) => {
  const model = getValues('model')
  return (
    <>
      <CustomSelectField label="Type" {...register("variety")} provider={arrayProvider(evVarieties)}/>
      <TextField label="Value" {...register("payload")} />

      <CustomSelectField label="Model" {...register("model")} provider={arrayProvider(modelVarieties)}/>
      <CustomSelectField label="Target" {...register("target")} provider={useTeamOptionsProvider}/>
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
