// Initializes the `league-participants` service on path `/league-participants`
const { LeaguePlayers } = require('./leaguePlayers.class');
const createModel = require('../../models/leaguePlayers.model');
const hooks = require('./leaguePlayers.hooks');
const updateLeagueplayers = require('./updateLeagueplayers');

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
  
  app.service("matches").on("timeUp", updateLeagueplayers(app));
  // app.service("matches").get("60fd5b05c563ba0eb48142af").then(match => {
  //   updateLeagueplayers(app)(match);
  // })
  service.hooks(hooks);
};
