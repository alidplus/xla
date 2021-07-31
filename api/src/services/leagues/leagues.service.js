// Initializes the `leagues` service on path `/leagues`
const { Leagues } = require('./leagues.class');
const createModel = require('../../models/leagues.model');
const hooks = require('./leagues.hooks');
const leagueActions = require('./leagues.actions');
const registerActions = require('../feathers-actions');


module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.use('/leagues', new Leagues(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('leagues');
  4
  registerActions('/league/actions', leagueActions, app)

  service.hooks(hooks);
};
