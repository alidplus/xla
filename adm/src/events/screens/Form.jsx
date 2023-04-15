import TextField from "components/form/TextField";
import React, {useMemo} from "react";
import SelectField from "components/form/SelectField";
import SwitchField from "components/form/SwitchField";
import {arrayProvider} from 'lib/optionsProvider'
import useLeagueOptionsProvider from "src/leagues/hooks/useOptionsProvider";
import useMatchOptionsProvider from "src/matches/hooks/useOptionsProvider";
import useLeaguePlayerOptionsProvider from "src/leaguePlayers/hooks/useOptionsProvider";
import useCommonGet from "lib/useCommonGet";
import TeamInline from "src/teams/screens/Inline";
import { eventsDuck } from 'store/services'

const eTypes = eventsDuck.options.consts.eTypes

const Form = ({ register, control, data, getValues, errors }) => {
  const league = getValues('league')
  const matchQuery = useMemo(() => ({ league }), [league])

  const matchId = getValues('match')
  const match = useCommonGet('matches', matchId)
  const leagueHome = useCommonGet('leagueTeams', match?.home)
  const leagueAway = useCommonGet('leagueTeams', match?.away)
  const home = useCommonGet('teams', leagueHome?.team ?? match?.home)
  const away = useCommonGet('teams', leagueAway?.team ?? match?.away)

  const side = getValues('team')
  const playerQuery = useMemo(() => ({
    league,
    leagueTeam: (side === 'home' ? leagueHome._id : (side === 'away' ? leagueAway._id : '000000000000000000000000') )
  }), [side, leagueHome, leagueAway, league])

  const teamSwitchProps = useMemo(() => {
    return {
      trueLabel: home ? <TeamInline data={home}/> : 'میزبان',
      falseLabel: away ? <TeamInline data={away}/> : 'میهمان',
      trueValue: 'home',
      falseValue: 'away'
    }
  }, [home, away])

  const eType = getValues('eType')
  return (
    <>
      <SelectField label="League" {...register("league")} provider={useLeagueOptionsProvider}/>
      <SelectField label="Match" {...register("match")} provider={useMatchOptionsProvider} query={matchQuery}/>
      <SelectField label="Type" {...register("eType")} provider={arrayProvider(eTypes)}/>
      { (['goal','yc','rc']).includes(eType) ? (
        <>
          <TextField label="Time" type="number" min="0" max="120s" {...register("time")} />
          <SwitchField label="Team" {...register("team")} {...teamSwitchProps} />
          <SelectField label="Player" {...register("player")} provider={useLeaguePlayerOptionsProvider} query={playerQuery}/>
          <pre>{JSON.stringify({side, playerQuery}, null, 2)}</pre>
        </>
      ) : null}
      {/*<DevTool control={control} />*/}
    </>
  )
}

export default Form
