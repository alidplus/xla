const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./partials')

const attrs = module.exports.attrs = {
  // _id: ID,
  name: title.required(),
  email: email.required(),
  mobile: mobile.required(),
  // password,
  // confirmPassword: password.label('Confirm password'),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


