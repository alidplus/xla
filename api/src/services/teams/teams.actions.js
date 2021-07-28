const Actions = require('../feathers-actions')
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  joinLeague: [
    authenticate('jwt'),
    createLeagueTeamAndLeaguePlayers
  ]
}

async function createLeagueTeamAndLeaguePlayers (data, params, app) {

  try {
    const leagueTeamService = app.service("leagueTeams");

    const leagueTeam = {
      team: data.team,
      league: data.league,
    }
    const cnt = await leagueTeamService.Model.countDocuments(leagueTeam);
    if(cnt > 0) {
      throw new Error("this teamLeague EXISTS!")
    }
    const { _id: leagueTeamId } = await leagueTeamService.create(leagueTeam);

    const leaguePlayersService = app.service("leaguePlayers");
    const playerService = app.service("players");

    const allPromises = Object.keys(data.teamForm).map(async (key) => {
      const playerId = data.teamForm[key];
      const player = await playerService.get(playerId);
      const leaguePlayer = {
        team: data.team,
        league: data.league,
        leagueTeam: leagueTeamId,
        player: playerId,
        name: player.name,
        no: player.no,
      }

      const createdleaguePlayer = await leaguePlayersService.create(leaguePlayer);
      return createdleaguePlayer;
    })

    await Promise.all(allPromises);

    return ({ action: 'done' })
  } catch(e) {
    console.log("team.actions.js: " + e.message);
    return ({ action: 'error' })
  }
}
