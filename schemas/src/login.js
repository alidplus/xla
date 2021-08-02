const Joi = require('joi')
const { password, email } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  email: email.required(),
  password: password.required(),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)

const fields = module.exports.fields = Object.keys(attrs);



