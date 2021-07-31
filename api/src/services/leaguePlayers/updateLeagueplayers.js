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
    for(playerId in groupedData) {
      const findLeaguePlayer = await LeaguePlayersService.Model.findOne({
        player: playerId,
        league: match.league,
      });
      statistics = findLeaguePlayer.statistics || {};
      groupedData[playerId].forEach(event => {
        const eType = event.eType;
        set(statistics, eType, get(statistics, eType, 0) + 1);        
      })
      console.log(statistics);
      await LeaguePlayersService.patch(findLeaguePlayer._id, {statistics});
    }

  } catch(e) {
    console.log("updateLeagueplayers.js: " + e.message);
    throw new Error("can't updateLeagueplayers");
  }
}