const set = require("lodash/set");
const get = require("lodash/get");
const queue = require('async/queue')

const q = queue(calculateResult, 1)
let counter = 0
module.exports = ( app, option ) => event => {
  q.push({ event, option, app }, () => {
    console.log('event process is done', event._id, counter++, 'remained:', q.length())
  })
}

q.drain(function() {
  console.log('all items have been processed');
});
q.error(function(e) {
  console.log('q errrrr', e);
});

async function calculateResult ( { option, event, app }, cb ) {
  const { diff = 1 } = option

  const MatchService = app.service("matches");
  const EventService = app.service("events");
  try {
    const match = await MatchService.get(event.match);
    const result = match.result || {};
    const homeOrAway = event.team;
    const eventsType = event.eType;
    const path = `${homeOrAway}.${eventsType}`

    set(result, path, get(result, path, 0) + diff)

    await EventService.patch(event._id, {isChecked: true} );
    const patchedMatch = await MatchService.patch(event.match, {result, timeUp: (eventsType === "timeUp" ? event._id : null) } );
    if (eventsType === "timeUp") {
      MatchService.emit('timeUp', patchedMatch);
    }

  } catch(e) {
    console.log(">>>>>>>calculateRes: ", e);
  }
}
