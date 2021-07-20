// Initializes the `league-participants` service on path `/league-participants`
const { LeagueTeams } = require('./league-teams.class');
const createModel = require('../../models/league-teams.model');
const hooks = require('./league-teams.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/league-teams', new LeagueTeams(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('league-teams');

  service.hooks(hooks);
};
