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

module.exports.ID = Joi.string().length(24).hex()

module.exports.rate = Joi.number().min(0).max(5)
module.exports.playerNo = Joi.number().min(0).max(99)

module.exports.bDate = Joi.date().max('1-1-2007')
module.exports.futureDate = Joi.date().min('now')
