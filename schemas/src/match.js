
const Joi = require('joi')
const { ID, title, playerNo, futureDate, mobile } = require('./partials')

module.exports = {}


const attrs = module.exports.attrs = {

  // startTime: futureDate.required(),
  matchDay: Joi.number().min(1),
  result: Joi.any().optional(),

  home: ID,
  away: ID,
  league: ID,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


