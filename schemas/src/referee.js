const Joi = require('joi')
const { ID, title, rate, email, mobile } = require('./utils')

const attrs = {
  name: title.required(),
  lvl: rate,
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


