// Application hooks that run for every service
const { debug, iff, isProvider, disallow } = require('feathers-hooks-common')
const allowApiKey = require('./hooks/allowApiKey');
const { authenticate } = require('@feathersjs/authentication').hooks;


module.exports = {
  before: {
    all: [],
    find: [
      iff(isProvider("external"), [
        allowApiKey(),
        authenticate('jwt', 'apiKey'),
      ]),
      hook => {
        if(hook.params.query.$limit === -1) {
          hook.params.paginate = false;
          delete hook.params.query.$limit;
        }
      },
      // debug('app: before find')
    ],
    get: [
      iff(isProvider("external"), [
        allowApiKey(),
        authenticate('jwt', 'apiKey'),
      ]),
    ],
    create: [],
    update: [
      disallow("external")
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
