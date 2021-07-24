module.exports = (app) => async (match) => {
  if (!match.timeup)
    throw new Error("match hasn't finished yet");

  const {homePerformance, awayPerformance} = performanceCalculator(match.result);

  unpdateInformation(app, match.home, match.league, homePerformance);
  unpdateInformation(app, match.away, match.league, awayPerformance);

  // console.log("Im hereeeeeeeeeee");
}

function performanceCalculator(result) {
  const {homeRes, awayRes} = result;
  const gd = home.goal - away.goal;

  const homePerformance = {};
  const awayPerformance = homePerformance;

  if ( gd > 0 ) {
    homePerformance.win = 1;
    awayPerformance.loss = 1;
  }
  else if ( gd === 0 ) {
    homePerformance.draw = 1;
    awayPerformance.draw = 1;
  }
  else {
    homePerformance.loss = 1;
    awayPerformance.win = 1;
  }

  homePerformance.gf = homeRes.goal;
  awayPerformance.gf = awayRes.goal;

  homePerformance.ga = awayRes.goal;
  awayPerformance.ga = homeRes.goal;

  homePerformance.gd = gd;
  awayPerformance.gd = -gd;

  homePerformance.yc = homeRes.yc;
  awayPerformance.yc = awayRes.yc;
  homePerformance.rc = homeRes.rc;
  awayPerformance.rc = awayRes.rc;

  return {
    homePerformance,
    awayPerformance,
  }
}

async function unpdateInformation(app, teamId, leagueId, performance) {
  const leagueTeamsServise = app.service('leagueTeams');
  const searchOptions = {
    team: teamId,
    league: leagueId,
  };
  const findleagueTeam = await leagueTeamsServise.Model.findOne(searchOptions);

  if(!findleagueTeam) {
    throw new Error("wrong teamId or leagueId");
  }

  const preStatistics = findleagueTeam.statistics;
  const postStatistics = {
    played: preStatistics + 1,
    points: preStatistics + (performance.win || 0) * 3 + (performance.draw || 0),
    win: preStatistics + (performance.win || 0),
    draw: preStatistics + (performance.draw || 0),
    loss: preStatistics + (performance.loss || 0),
    gf: preStatistics + (performance.goal || 0), // goal for
    ga: preStatistics + (performance.ga || 0), // goal against
    gd: preStatistics + (performance.gd || 0), // goal difference
    rc: preStatistics + (performance.rc || 0), // red card
    yc: preStatistics + (performance.yc || 0), // yellow card
  }
  await leagueTeamsServise.patch(searchOptions, {statistics: postStatistics})
}