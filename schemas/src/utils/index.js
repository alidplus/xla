const Joi = require('joi')

module.exports = {}
module.exports.title = Joi.string().trim().min(5).max(30)
  .regex(/^[\sa-zA-Z0-9]*$/, 'letters, numbers and spaces')

module.exports.password = Joi.string().trim().min(5).max(30)
  .regex(/^[\sa-zA-Z0-9]*$/, 'letters, numbers and spaces')

module.exports.fullName = Joi.string().trim().max(30)

module.exports.address = Joi.string().trim().max(120)

module.exports.email = Joi.string()//.email({ tlds: { allow: false } })

module.exports.mobile = Joi.string()

module.exports.ID = Joi.string()
