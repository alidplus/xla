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
        authenticate('jwt', 'origin'),
      ]),
      hook => {
        if(+hook.params.query.$limit === -1) {
          hook.params.paginate = false;
          delete hook.params.query.$limit;
        }
      },
    ],
    get: [
      iff(isProvider("external"), [
        allowApiKey(),
        authenticate('jwt', 'origin'),
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
    all: [/*debug('aftre all app errors', 'headers')*/],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
