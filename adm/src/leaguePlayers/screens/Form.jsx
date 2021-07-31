import {Avatar, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import RateField from "components/form/RateField"
import FsUploader from "components/FsUploader";
import React, { useState } from "react";
import classnames from "classnames";
import SelectField from "components/form/SelectField";
import useTeamOptionsProvider from "src/teams/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import usePlayerOptionsProvider from "src/players/hooks/useOptionsProvider";
import useLeagueTeamOptionsProvider from "src/leagueTeams/hooks/useOptionsProvider";

const Form = ({ register, control, data }) => {
  const [activeTab, setActiveTab] = useState('1')
  return (
    <>
     <TextField label="Name" {...register("name")} />
     <TextField label="No#" {...register("no")} />
     <SelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
     <SelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
     <SelectField label="Player" {...register("player")} provider={usePlayerOptionsProvider}/>
     <SelectField label="LeagueTeam" {...register("leagueTeam")} provider={useLeagueTeamOptionsProvider}/>
    </>
  )
}

export default Form
