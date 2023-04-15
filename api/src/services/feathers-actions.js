const _ = require('lodash')
const { combine } = require('feathers-hooks-common')

class Actions {
  constructor(actions = {}, app) {
    this.app = app
    this.actions = actions
  }

  static hooks = {
    before: {
      all: [
        ctx => { ctx.params._ctx = ctx }
      ]
    }
  }

  async create (data, params) {
    const actionPath = data.action
    if (!actionPath) throw new Error('missing action path')
    if (!this.actions.hasOwnProperty(actionPath)) throw new Error('missing action')
    let hooks = []
    let action = this.actions[actionPath];
    if (Array.isArray(action)) {
      hooks = action.slice(0, action.length - 1)
      action = action[action.length - 1]
    }
    if (action && typeof action === 'function') {
      const ctx = await combine(...hooks).call(this, params._ctx)
      return action.call(this, data.payload, ctx.params, this.app)
    }
    throw new Error('bad action path')
  }
  async find(params) {
    return Object.keys(this.actions)
  }
}

module.exports = (name, actions, app) => {
  app.use(name, new Actions(actions, app))
  const service = app.service(name)
  service.hooks(Actions.hooks)
}
