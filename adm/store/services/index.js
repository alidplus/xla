import featherDuckGenerator from './featherDuckGenerator'
import Duck from 'extensible-duck';
import emptyDuck from './emptyDuck'

import extendedUserDuck from './users.extends'
// import extendedTeamsDuck from './teams.extends.js'
// import extendedLeaguesDuck from './leagues.extends.js'
// import extendedMatchesDuck from './matches.extends.js'
// import extendedPlayersDuck from './players.extends.js'
// import extendedEventsDuck from './events.extends.js'
// import extendedRefereesDuck from './referees.extends.js'
// import extendedSponsorsDuck from './sponsors.extends.js'
// import extendedFsDuck from './fs.extends.js'


const ducks = {}

const users = (new Duck(emptyDuck('users')))
  .extend(featherDuckGenerator.bind({}, 'users'))
ducks.users = users

const teams = (new Duck(emptyDuck('teams')))
  .extend(featherDuckGenerator.bind({}, 'teams'))
ducks.teams = teams

const leagues = (new Duck(emptyDuck('leagues')))
  .extend(featherDuckGenerator.bind({}, 'leagues'))
ducks.leagues = leagues

const matches = (new Duck(emptyDuck('matches')))
  .extend(featherDuckGenerator.bind({}, 'matches'))
ducks.matches = matches

const players = (new Duck(emptyDuck('players')))
  .extend(featherDuckGenerator.bind({}, 'players'))
ducks.players = players

const events = (new Duck(emptyDuck('events')))
  .extend(featherDuckGenerator.bind({}, 'events'))
ducks.events = events

const referees = (new Duck(emptyDuck('referees')))
  .extend(featherDuckGenerator.bind({}, 'referees'))
ducks.referees = referees

const sponsors = (new Duck(emptyDuck('sponsors')))
  .extend(featherDuckGenerator.bind({}, 'sponsors'))
ducks.sponsors = sponsors

const fs = (new Duck(emptyDuck('fs')))
  .extend(featherDuckGenerator.bind({}, 'fs'))
ducks.fs = fs

ducks.users = users.extend(extendedUserDuck(ducks, 'users'))
// ducks.teams = teams.extend(extendedTeamsDuck(ducks, 'teams'))
// ducks.leagues = leagues.extend(extendedLeaguesDuck(ducks, 'leagues'))
// ducks.matches = matches.extend(extendedMatchesDuck(ducks, 'matches'))
// ducks.players = players.extend(extendedPlayersDuck(ducks, 'players'))
// ducks.events = events.extend(extendedEventsDuck(ducks, 'events'))
// ducks.referees = referees.extend(extendedRefereesDuck(ducks, 'referees'))
// ducks.sponsors = sponsors.extend(extendedSponsorsDuck(ducks, 'sponsors'))
// ducks.fs = fs.extend(extendedFsDuck(ducks, 'fs'))

export const usersDuck = ducks.users
export const teamsDuck = ducks.teams
export const leaguesDuck = ducks.leagues
export const matchesDuck = ducks.matches
export const playersDuck = ducks.players
export const eventsDuck = ducks.events
export const refereesDuck = ducks.referees
export const sponsorsDuck = ducks.sponsors
export const fsDuck = ducks.fs
export default ducks;

