const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep } = require('feathers-hooks-common');
const search = require('feathers-mongodb-fuzzy-search');

module.exports = {
  before: {
    all: [
      iff(isProvider("external"), [
        authenticate('jwt')
      ])
    ],
    find: [
      search()
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
