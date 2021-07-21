// Initializes the `teams` service on path `/teams`
const { Teams } = require('./teams.class');
const teamActions = require('./teams.actions');
const registerActions = require('../feathers-actions');
const createModel = require('../../models/teams.model');
const hooks = require('./teams.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  app.use('/teams', new Teams(options, app));
  const service = app.service('teams');
  service.hooks(hooks);

  registerActions('/team/actions', teamActions, app)
};
