const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep, debug } = require('feathers-hooks-common');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const search = require('feathers-mongodb-fuzzy-search');
const validate = require('feathers-validate-joi');
const { schema, options, fields } = require('@xla/schemas/src/user');

const keeper = () => iff(isProvider('external'), keep(...fields));

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
    create: [
      keeper(),
      validate.form(schema, options),
      hashPassword('password')
    ],
    update: [
      keeper(),
      validate.form(schema, options)
    ],
    patch: [
      keeper(),
      validate.validateProvidedData(schema, options)
    ],
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
