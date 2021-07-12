// Initializes the `players` service on path `/players`
const { Players } = require('./players.class');
const createModel = require('../../models/players.model');
const hooks = require('./players.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.use('/players', new Players(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('players');

  service.hooks(hooks);
};
