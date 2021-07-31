const groupBy = require('lodash/groupBy');
const set = require("lodash/set");
const get = require("lodash/get");

module.exports = (app) => async (match) => {
  try {
    const EventService = app.service("events");
    const searchOptions = {
      match: match._id,
    }
  
    const findMatchesEvents = await EventService.find({query: searchOptions});
  
    const groupedData = groupBy(findMatchesEvents.data, "player")
    
    const LeaguePlayersService = app.service("leaguePlayers");
    for(leaguePlayerId in groupedData) {
      const findLeaguePlayer = await LeaguePlayersService.get(leaguePlayerId);
      statistics = findLeaguePlayer.statistics || {};
      groupedData[leaguePlayerId].forEach(event => {
        const eType = event.eType;
        set(statistics, eType, get(statistics, eType, 0) + 1);        
      })
      // console.log(statistics);
      await LeaguePlayersService.patch(findLeaguePlayer._id, {statistics});
    }

  } catch(e) {
    console.log("updateLeagueplayers.js: " + e);
    throw new Error("can't updateLeagueplayers");
  }
}