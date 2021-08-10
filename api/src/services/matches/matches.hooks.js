const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep, alterItems  } = require('feathers-hooks-common');
const search = require('feathers-mongodb-fuzzy-search');
const validate = require('feathers-validate-joi');
const { schema, options, fields } = require('@xla/schemas/src/match');

const keeper = () => iff(isProvider('external'), keep(...fields));

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
    create: [
      keeper(),
      iff(isProvider("external"), [
        validate.form(schema, options)
      ])
    ],
    update: [
      keeper(),
      iff(isProvider("external"), [
        validate.form(schema, options)
      ])
    ],
    patch: [
      keeper(),
      iff(isProvider("external"), [
        validate.validateProvidedData(schema, options)
      ])
    ],
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
