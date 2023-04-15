const moment = require('moment'); // require
moment().format(); 

module.exports = ({numOfGame, matchDay, homeId, awayId, leagueId, refereeId}) => ({
  startTime: moment().subtract(numOfGame * 8, "h"),
  matchDay,
  home: homeId,
  away: awayId,
  league: leagueId,
  referee: refereeId,
});