const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep, debug } = require('feathers-hooks-common');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const search = require('feathers-mongodb-fuzzy-search');

const keeper = () => iff(isProvider('external'), [
  keep("name", "email", "mobile")
]);

module.exports = {
  before: {
    all: [
      iff(isProvider("external"), [
        authenticate('jwt')
      ]),
    ],
    find: [
      search()
    ],
    get: [],
    create: [ hashPassword('password')/*, e => { throw new Error('stop here') }*/ , keeper() ],
    update: [ keeper() ],
    patch: [ keeper() ],
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
