// Initializes the `fs` service on path `/fs`
const { Fs, uploadQueue, uploadQueueToMemory } = require('./fs.class');
const createModel = require('../../models/fs.model');
const hooks = require('./fs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ...app.get('serviceOptions')
  };

  // Initialize our service with any options it requires
  app.post('/fs/uploadqueue', uploadQueueToMemory.any(), uploadQueue(app))
  app.use('/fs', new Fs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fs');

  service.hooks(hooks);
};
