const Actions = require('../feathers-actions')
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  joinLeague: [
    authenticate('jwt'),
    async (data, params) => {
      console.log('run action', data)
      return ({ action: 'done' })
    }
  ]
}

