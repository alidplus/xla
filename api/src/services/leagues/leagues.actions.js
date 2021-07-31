const Actions = require('../feathers-actions')
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  generateMatch: [
    authenticate('jwt'),
    generator
  ]
}

async function generator (data, params, app) {
      
  try {
    // console.log(data);
    const {leagueId, startTime} = data;
    
    const MatchService = app.service("matches");
    const cnt = await MatchService.Model.countDocuments({league: leagueId});
    if(cnt > 0) {
      throw new Error("this leagues matches EXISTS!");
    }

    const LeagueTeamService = app.service("leagueTeams");
    const leagueTeamsArr = await LeagueTeamService.Model.find({league: leagueId});
    const shuffledLeagueTeamsArr = leagueTeamsArr
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value);

    const arrLen = shuffledLeagueTeamsArr.length;
    const allMatches = [];

    for(let i = 1; i < arrLen; i++) {
      for (let j = 0; j < arrLen / 2; j++) {
        const match = {
          startTime,
          matchDay: 0,
          home: null,
          away: null,
          league: leagueId,
        };
        match.home = shuffledLeagueTeamsArr[j];
        match.away = shuffledLeagueTeamsArr[arrLen - j - 1];
        match.matchDay = i;
        allMatches.push(match);
      }
      const lastOne = shuffledLeagueTeamsArr.pop();
      shuffledLeagueTeamsArr.splice(1, 0, lastOne);
    }

    const insertedMatches = await MatchService.create(allMatches);
    // console.log(">>>>>>", insertedMatches);
    return insertedMatches;
  } catch(e) {
    console.log("league.actions.js: ", e);
    return ({ action: 'error' })
  }
}