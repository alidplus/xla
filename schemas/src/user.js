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

const schema = module.exports.schema = Joi.object().keys(attrs);

const fields = module.exports.fields = Object.keys(attrs);


