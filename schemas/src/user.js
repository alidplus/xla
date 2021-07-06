const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./utils')

const attrs = {
  _id: ID,
  username: title.required(),
  email: email.required(),
  mobile: mobile.required(),
  // password,
  // confirmPassword: password.label('Confirm password'),
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


