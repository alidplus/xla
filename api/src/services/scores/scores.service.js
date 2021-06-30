// Initializes the `scores` service on path `/scores`
const { Scores } = require('./scores.class');
const createModel = require('../../models/scores.model');
const hooks = require('./scores.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/scores', new Scores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('scores');

  service.hooks(hooks);
};
