// Application hooks that run for every service
const { debug, iff, isProvider, disallow } = require('feathers-hooks-common')
const allowApiKey = require('./hooks/allowApiKey')

module.exports = {
  before: {
    all: [],
    find: [
      allowApiKey(),
      hook => {
        if(hook.params.query.$limit === -1) {
          hook.params.paginate = false;
          delete hook.params.query.$limit;
        }
      },
      // debug('app: before find')
    ],
    get: [
      allowApiKey(),
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
