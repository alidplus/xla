const Joi = require('joi')
const { password, email } = require('./utils')

const attrs = {
  email: email.required(),
  password: password.required(),
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };



