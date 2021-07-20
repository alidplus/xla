// Initializes the `league-participants` service on path `/league-participants`
const { LeaguePlayers } = require('./league-players.class');
const createModel = require('../../models/league-players.model');
const hooks = require('./league-players.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/league-players', new LeaguePlayers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('league-players');

  service.hooks(hooks);
};
