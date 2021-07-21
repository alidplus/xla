import {Avatar, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "atoms";
import TextField from "components/form/TextField";
import RateField from "components/form/RateField"
import FsUploader from "components/FsUploader";
import React, { useState } from "react";
import classnames from "classnames";
import CustomSelectField from "components/form/CustomSelectField";
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
     <CustomSelectField label="Team" {...register("team")} provider={useTeamOptionsProvider}/>
     <CustomSelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
     <CustomSelectField label="Player" {...register("player")} provider={usePlayerOptionsProvider}/>
     <CustomSelectField label="LeagueTeam" {...register("leagueTeam")} provider={useLeagueTeamOptionsProvider}/>
    </>
  )
}

export default Form
