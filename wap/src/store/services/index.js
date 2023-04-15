import featherGetDuckGenerator from './featherGetDuckGenerator'
import featherFindDuckGenerator from './featherFindDuckGenerator'
import Duck from 'extensible-duck';
import emptyDuck from './emptyDuck'

import extendedUserDuck from './users.extends'
// import extendedTeamsDuck from './teams.extends.js'
// import extendedLeaguesDuck from './leagues.extends.js'
// import extendedMatchesDuck from './matches.extends.js'
// import extendedPlayersDuck from './players.extends.js'
import extendedEventsDuck from './events.extends.js'
// import extendedRefereesDuck from './referees.extends.js'
// import extendedSponsorsDuck from './sponsors.extends.js'
// import extendedLeaguePlayersDuck from './leaguePlayers.extends.js'
// import extendedLeagueTeamsDuck from './leagueTeams.extends.js'
// import extendedFsDuck from './fs.extends.js'
import extendedCommonDuck from './common.extends.js'


const ducks = {}

const users = (new Duck(emptyDuck('users')))
  .extend(featherGetDuckGenerator.bind({}, 'users'))
  .extend(featherFindDuckGenerator.bind({}, 'users'))
ducks.users = users

const teams = (new Duck(emptyDuck('teams')))
  .extend(featherGetDuckGenerator.bind({}, 'teams'))
  .extend(featherFindDuckGenerator.bind({}, 'teams'))
ducks.teams = teams

const leagues = (new Duck(emptyDuck('leagues')))
  .extend(featherGetDuckGenerator.bind({}, 'leagues'))
  .extend(featherFindDuckGenerator.bind({}, 'leagues'))
ducks.leagues = leagues

const matches = (new Duck(emptyDuck('matches')))
  .extend(featherGetDuckGenerator.bind({}, 'matches'))
  .extend(featherFindDuckGenerator.bind({}, 'matches'))
ducks.matches = matches

const players = (new Duck(emptyDuck('players')))
  .extend(featherGetDuckGenerator.bind({}, 'players'))
  .extend(featherFindDuckGenerator.bind({}, 'players'))
ducks.players = players

const events = (new Duck(emptyDuck('events')))
  .extend(featherGetDuckGenerator.bind({}, 'events'))
  .extend(featherFindDuckGenerator.bind({}, 'events'))
ducks.events = events

const referees = (new Duck(emptyDuck('referees')))
  .extend(featherGetDuckGenerator.bind({}, 'referees'))
  .extend(featherFindDuckGenerator.bind({}, 'referees'))
ducks.referees = referees

const sponsors = (new Duck(emptyDuck('sponsors')))
  .extend(featherGetDuckGenerator.bind({}, 'sponsors'))
  .extend(featherFindDuckGenerator.bind({}, 'sponsors'))
ducks.sponsors = sponsors

const fs = (new Duck(emptyDuck('fs')))
  .extend(featherGetDuckGenerator.bind({}, 'fs'))
  .extend(featherFindDuckGenerator.bind({}, 'fs'))
ducks.fs = fs

const leagueTeams = (new Duck(emptyDuck('leagueTeams')))
  .extend(featherGetDuckGenerator.bind({}, 'leagueTeams'))
  .extend(featherFindDuckGenerator.bind({}, 'leagueTeams'))
ducks.leagueTeams = leagueTeams

const leaguePlayers = (new Duck(emptyDuck('leaguePlayers')))
  .extend(featherGetDuckGenerator.bind({}, 'leaguePlayers'))
  .extend(featherFindDuckGenerator.bind({}, 'leaguePlayers'))
ducks.leaguePlayers = leaguePlayers


ducks.users =     users.extend(extendedUserDuck(ducks, 'users'))
// ducks.teams =     teams.extend(extendedTeamsDuck(ducks, 'teams'))
// ducks.leagues =   leagues.extend(extendedLeaguesDuck(ducks, 'leagues'))
// ducks.matches =   matches.extend(extendedMatchesDuck(ducks, 'matches'))
// ducks.players =   players.extend(extendedPlayersDuck(ducks, 'players'))
ducks.events =    events.extend(extendedEventsDuck(ducks, 'events'))
// ducks.referees =  referees.extend(extendedRefereesDuck(ducks, 'referees'))
// ducks.sponsors =  sponsors.extend(extendedSponsorsDuck(ducks, 'sponsors'))
// ducks.leagueTeams =  leagueTeams.extend(extendedLeagueTeamsDuck(ducks, 'leagueTeams'))
// ducks.leaguePlayers =  leaguePlayers.extend(extendedLeaguePlayersDuck(ducks, 'leaguePlayers'))
// ducks.fs =        fs.extend(extendedFsDuck(ducks, 'fs'))


ducks.users =     ducks.users.extend(extendedCommonDuck(ducks, 'users'))
ducks.teams =     ducks.teams.extend(extendedCommonDuck(ducks, 'teams'))
ducks.leagues =   ducks.leagues.extend(extendedCommonDuck(ducks, 'leagues'))
ducks.matches =   ducks.matches.extend(extendedCommonDuck(ducks, 'matches'))
ducks.players =   ducks.players.extend(extendedCommonDuck(ducks, 'players'))
ducks.events =    ducks.events.extend(extendedCommonDuck(ducks, 'events'))
ducks.referees =  ducks.referees.extend(extendedCommonDuck(ducks, 'referees'))
ducks.sponsors =  ducks.sponsors.extend(extendedCommonDuck(ducks, 'sponsors'))
ducks.fs =        ducks.fs.extend(extendedCommonDuck(ducks, 'fs'))
ducks.leagueTeams = ducks.leagueTeams.extend(extendedCommonDuck(ducks, 'leagueTeams'))
ducks.leaguePlayers = ducks.leaguePlayers.extend(extendedCommonDuck(ducks, 'leaguePlayers'))

export const usersDuck = ducks.users
export const teamsDuck = ducks.teams
export const leaguesDuck = ducks.leagues
export const matchesDuck = ducks.matches
export const playersDuck = ducks.players
export const eventsDuck = ducks.events
export const refereesDuck = ducks.referees
export const sponsorsDuck = ducks.sponsors
export const fsDuck = ducks.fs
export const leagueTeamsDuck = ducks.leagueTeams
export const leaguePlayersDuck = ducks.leaguePlayers
export default ducks;

