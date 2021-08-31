
import React from "react";
import SelectField from "components/form/SelectField";
import JdateField from "components/form/JdateField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useRefereeOptionsProvider from "src/referees/hooks/useOptionsProvider";
import {FormGroup, InputGroup, InputGroupAddon, Label, ModalBody} from "../../../atoms";
import TextField from "../../../components/form/TextField";

const SearchForm = ({ register, control, data }) => {
  return (
    <>
      <FormGroup className="mb-2">
        <Label>Start Time: </Label>
        <InputGroup>
          <JdateField {...register("startTime__$gte")} nativeControl removable timeBound="start" timePicker={false}/>
          <InputGroupAddon addonType="prepend">to</InputGroupAddon>
          <JdateField {...register("startTime__$lte")} nativeControl removable timeBound="end" timePicker={false}/>
        </InputGroup>
      </FormGroup>
      <TextField label="Title" {...register("title")} />
      <TextField label="Slug" {...register("slug")} disabled />
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default SearchForm
