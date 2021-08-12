const Joi = require('joi')
const { ID, title, playerNo, bDate, mobile } = require('./partials')
const attrs = module.exports.attrs = {
  name: title.required(),
  no: playerNo.required(),

  team: ID,
  league: ID,
  player: ID,
  leagueteam: ID,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


