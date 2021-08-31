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
    console.log({startTime: startTime.clone()})

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
    const mpd = 3 //match per day
    for(let i = 1; i < arrLen; i++) {
      for (let j = 0; j < arrLen / 2; j++) {
        const ddo = Math.floor(i / mpd)
        const match = {
          startTime: startTime.clone().add(i - 1 + ddo, 'days').startOf('day').add((ddo * 24) + (j * 2) + 18, 'hours').toDate(),
          matchDay: 0,
          home: null,
          away: null,
          league: leagueId,
        };
        console.log(match.startTime, 'startTime',i - 1 + ddo, ddo * 24 + (j * 2) + 18);
        match.home = shuffledLeagueTeamsArr[j]._id;
        match.away = shuffledLeagueTeamsArr[arrLen - j - 1]._id;
        match.matchDay = i;
        allMatches.push(match);
      }
      const lastOne = shuffledLeagueTeamsArr.pop();
      shuffledLeagueTeamsArr.splice(1, 0, lastOne);
    }
    // console.log(">>>>>>>>>>>>>>>>allMatches\n", allMatches);

    // console.log(">>>>>>>>>>>>>>>>", allMatches[0].home, "<<<<<<<<<<<<<<<<<<");
    // console.log(">>>>>>>>>>>>>>>>", allMatches[0].away, "<<<<<<<<<<<<<<<<<<");
    const insertedMatches = await MatchService.create(allMatches);
    // console.log(">>>>>>", insertedMatches);
    return insertedMatches;
  } catch(e) {
    console.log("league.actions.js: ", e);
    return ({ action: 'error' })
  }
}
