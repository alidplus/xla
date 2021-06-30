// Application hooks that run for every service
const { debug } = require('feathers-hooks-common')
module.exports = {
  before: {
    all: [],
    find: [
      hook => {
        if(hook.params.query.$limit === -1) {
          hook.params.paginate = false;
          delete hook.params.query.$limit;
        }
      },
      debug('app: before find')
    ],
    get: [],
    create: [],
    update: [],
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
