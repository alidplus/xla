const Joi = require('joi')
const { ID, title} = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  title: title.required(),
  description: title,
  teams: Joi.number(),
  homeAway: Joi.bool(),

  sponsor: ID,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs);

const fields = module.exports.fields = Object.keys(attrs);


