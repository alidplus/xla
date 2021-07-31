module.exports = (app) => async (match) => {

  if (!match.timeUp)
    throw new Error("match hasn't finished yet");
  
  console.log("\n>>>>>>>>>>>>\nImHereeee\n<<<<<<<<<<<<<\n");
  const { homePerformance, awayPerformance } = performanceCalculator(match.result);

  updateInformation(app, match.home, homePerformance);
  updateInformation(app, match.away, awayPerformance);

  const MatchServise = app.service('matches');
  await MatchServise.patch(match._id, { isChecked: true });

}

function performanceCalculator(result) {
  try {
    const { home: homeRes, away: awayRes } = result;
    const gd = homeRes.goal - awayRes.goal;
  
    const homePerformance = {};
    const awayPerformance = {};
  
    if (gd > 0) {
      homePerformance.win = 1;
      awayPerformance.loss = 1;
    }
    else if (gd === 0) {
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
  } catch(e) {
    console.log("updateLeagueTeams.js/performanceCalculator \n" + e.message);
    throw new Error("can't calculate performance");
  }
}

async function updateInformation(app, leagueTeamsId, performance) {
  try {
    const leagueTeamsServise = app.service('leagueTeams');
    // const searchOptions = {
    //   team: teamId,
    //   league: leagueId,
    // };
    const findleagueTeam = await leagueTeamsServise.get(leagueTeamsId);
    
    if (!findleagueTeam) {
      console.log("can't find team league");
      throw new Error("wrong teamId or leagueId");
    }
    
    const preStatistics = findleagueTeam.statistics;

    const postStatistics = {
      played: preStatistics.played + 1,
      points: preStatistics.points + (performance.win || 0) * 3 + (performance.draw || 0),
      win: preStatistics.win + (performance.win || 0),
      draw: preStatistics.draw + (performance.draw || 0),
      loss: preStatistics.loss + (performance.loss || 0),
      gf: preStatistics.gf + (performance.goal || 0), // goal for
      ga: preStatistics.ga + (performance.ga || 0), // goal against
      gd: preStatistics.gd + (performance.gd || 0), // goal difference
      rc: preStatistics.rc + (performance.rc || 0), // red card
      yc: preStatistics.yc + (performance.yc || 0), // yellow card
    }


    await leagueTeamsServise.patch(leagueTeamsId, { statistics: postStatistics });
  } catch(e) {
    console.log("updateLeagueTeams.js/updateInformation \n" + e.message);
    throw new Error("can't Update Information");
  }
}