const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  // _id: ID,
  title: title.required(),
  text: title,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


