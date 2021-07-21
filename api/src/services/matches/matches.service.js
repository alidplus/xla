// Initializes the `matches` service on path `/matches`
const { Matches } = require('./matches.class');
const createModel = require('../../models/matches.model');
const hooks = require('./matches.hooks');
const calcRes = require('./caculateResult');

module.exports = async function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.use('/matches', new Matches(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('matches');

  service.hooks(hooks);

  app.service("events").on("created", calcRes(app, {diff: 1}));
  app.service("events").on("removed", calcRes(app, {diff: -1}));
};
