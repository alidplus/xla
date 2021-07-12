// Initializes the `referees` service on path `/referees`
const { Referees } = require('./referees.class');
const createModel = require('../../models/referees.model');
const hooks = require('./referees.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.use('/referees', new Referees(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('referees');

  service.hooks(hooks);
};
