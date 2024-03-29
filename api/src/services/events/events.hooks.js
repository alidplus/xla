const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider, preventChanges, keep, debug, alterItems } = require('feathers-hooks-common');
const validate = require('feathers-validate-joi');
const { schema, options, fields } = require('@xla/schemas/src/event');

const keeper = () => iff(isProvider('external'), keep(...fields));

module.exports = {
  before: {
    all: [
      iff(isProvider("external"), [
        authenticate('jwt')
      ])
    ],
    find: [],
    get: [],
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
    create: [
      (ctx) => { if(Array.isArray(ctx.result)) ctx.event = null; }
    ],
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
