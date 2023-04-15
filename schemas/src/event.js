const Joi = require('joi')
const { ID, matchTime } = require('./partials')

module.exports = {}

const attrs = module.exports.attrs = {
  league: ID.required(),
  match: ID.required(),
  eType: Joi.string().required(),

  team: Joi.string().when('eType', { is: Joi.valid('goal', 'yc', 'rc'), then: Joi.required() }),
  player: ID.when('eType', { is: Joi.valid('goal', 'yc', 'rc'), then: Joi.required() }),
  time: matchTime.empty('').default(0).when('eType', { is: Joi.valid('goal', 'yc', 'rc'), then: Joi.required(), otherwise: Joi.valid('') }),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


