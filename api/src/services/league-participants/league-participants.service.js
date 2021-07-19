// Initializes the `league-participants` service on path `/league-participants`
const { LeagueParticipants } = require('./league-participants.class');
const createModel = require('../../models/league-participants.model');
const hooks = require('./league-participants.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/league-participants', new LeagueParticipants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('league-participants');

  service.hooks(hooks);
};
