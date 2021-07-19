const users = require('./users/users.service.js');
const teams = require('./teams/teams.service.js');
const players = require('./players/players.service.js');
const leagues = require('./leagues/leagues.service.js');
const matches = require('./matches/matches.service.js');
const referees = require('./referees/referees.service.js');
const sponsors = require('./sponsors/sponsors.service.js');
const events = require('./events/events.service.js');
const fs = require('./fs/fs.service.js');
const leagueParticipants = require('./league-participants/league-participants.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(events);
  app.configure(teams);
  app.configure(players);
  app.configure(leagues);
  app.configure(matches);
  app.configure(referees);
  app.configure(sponsors);
  app.configure(fs);
  app.configure(leagueParticipants);
};
