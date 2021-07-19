const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep, debug } = require('feathers-hooks-common');
const search = require('feathers-mongodb-fuzzy-search');

module.exports = {
  before: {
    all: [
      iff(isProvider("external"), [
        authenticate('jwt')
      ])
    ],
    find: [
      debug("first"),
      search(),
      debug("second")
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
