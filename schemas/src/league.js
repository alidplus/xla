const Joi = require('joi')
const { ID, title, playerNo, futureDate, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {

  title: title.required(),
  text: title,
  teams: Joi.number(),
  homeAway: Joi.bool(),

  results: Joi.object(),

  sponsor: ID,
  participants: Joi.array().items(ID),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs);

const fields = module.exports.fields = Object.keys(attrs);


