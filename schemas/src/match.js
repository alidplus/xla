
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

const schema = module.exports.schema = Joi.object().keys(attrs)

const fields = module.exports.fields = Object.keys(attrs);


