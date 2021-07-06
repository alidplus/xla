const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep } = require('feathers-hooks-common');

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;


module.exports = {
  before: {
    all: [ /*authenticate('jwt')*/ ],
    find: [],
    get: [],
    create: [ hashPassword('password') ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ protect('password') ],
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
