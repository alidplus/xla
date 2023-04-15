import React from "react";
import SelectField from "components/form/SelectField";
import JdateField from "components/form/JdateField";
import useCategoryOptionsProvider from "src/categories/hooks/useOptionsProvider";
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useRefereeOptionsProvider from "src/referees/hooks/useOptionsProvider";
import useSponsorOptionsProvider from "src/sponsors/hooks/useOptionsProvider";
import useLeagueTeamOptionsProvider from "src/leagueTeams/hooks/useOptionsProvider";
import useMatchOptionsProvider from "src/matches/hooks/useOptionsProvider";
import useLeaguePlayerOptionsProvider from "src/leaguePlayers/hooks/useOptionsProvider";
import TextField from "../../../components/form/TextField";
import { Row, Col } from 'atoms'

const Form = ({ register, control, data }) => {
  return (
    <Row>
      <Col>
        <SelectField label="Category" {...register("category")} provider={useCategoryOptionsProvider}/>
        <TextField label="Title" {...register("title")} />
        <TextField label="Lead" {...register("lead")} />
        <TextField label="Body" {...register("body")} type="textarea" />
        <TextField label="Slug" {...register("slug")} disabled />
      </Col>
      <Col>
        <SelectField label="Sponsor" {...register("sponsor")} provider={useSponsorOptionsProvider}/>
        <SelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
        <SelectField label="Match" {...register("match")} provider={useMatchOptionsProvider}/>
        <SelectField label="LeagueTeam" {...register("leagueTeam")} provider={useLeagueTeamOptionsProvider}/>
        <SelectField label="LeaguePlayer" {...register("leaguePlayer")} provider={useLeaguePlayerOptionsProvider}/>
        <SelectField label="Referee" {...register("referee")} provider={useRefereeOptionsProvider}/>
      {/*<DevTool control={control} />*/}
      </Col>
    </Row>
  )
}

export default Form
