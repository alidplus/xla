const Joi = require('joi')
const { ID, title, playerNo, futureDate, mobile } = require('./utils')

const attrs = {

  title: title.required(),
  text: title,
  teams: Joi.number(),
  homeAway: Joi.bool(),

  results: Joi.object(),

  sponsor: ID,
  participants: Joi.array().items(ID),
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


