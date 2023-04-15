const Joi = require('joi')
const { ID, title, rate, email, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  name: title.required(),
  lvl: rate,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


