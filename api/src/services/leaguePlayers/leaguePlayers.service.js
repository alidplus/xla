// Initializes the `league-participants` service on path `/league-participants`
const { LeaguePlayers } = require('./leaguePlayers.class');
const createModel = require('../../models/leaguePlayers.model');
const hooks = require('./leaguePlayers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.use('/leaguePlayers', new LeaguePlayers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('leaguePlayers');

  service.hooks(hooks);
};
