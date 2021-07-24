// Initializes the `league-participants` service on path `/league-participants`
const { LeagueTeams } = require('./leagueTeams.class');
const createModel = require('../../models/leagueTeams.model');
const hooks = require('./leagueTeams.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.use('/leagueTeams', new LeagueTeams(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('leagueTeams');

  service.hooks(hooks);
};
