const Joi = require('joi')
const { ID, title, playerNo, futureDate, mobile } = require('./utils')

const attrs = {

  time: futureDate.required(),
  results: Joi.object(),

  home: ID,
  away: ID,
  league: ID,
  referee: ID
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


