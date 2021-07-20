const set = require("lodash/set");
const get = require("lodash/get");

module.exports = ( app, {diff = 1} ) => async ( event ) => {
  // console.log("log hereeeeeeeeeeee");

  const MatchService = app.service("matches");
  try {
    const match = await MatchService.get(event.match);
    const result = match.result || {};
    const homeOrAway = event.team;
    const eventsType = event.eType;
    const path = `${homeOrAway}.${eventsType}`

    set(result, path, get(result, path, 0) + diff)

    await MatchService.patch(event.match, {result} );
  } catch(e) {
    console.log(">>>>>>>calculateRes: ", e.message);
  }

}