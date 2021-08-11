const Joi = require('joi')
// const ObjectID = require("bson-objectid");
// const joiDefaultOptions = {
//   abortEarly: true,
//   allowUnknown: false,
//   cache: true,
//   convert: true,
//   debug: false,
//   externals: true,
//   noDefaults: false,
//   nonEnumerables: false,
//   presence: 'optional',
//   skipFunctions: false,
//   stripUnknown: false,
//   getContext: undefined,
//   setContext: undefined,
// };

module.exports = {}

const title = module.exports.title = Joi.string().trim().min(3).max(30)

const password = module.exports.password = Joi.string().trim().min(5).max(30)
  .regex(/^[\sa-zA-Z0-9]*$/, 'letters, numbers and spaces')

const fullName = module.exports.fullName = Joi.string().trim().max(30)

const address = module.exports.address = Joi.string().trim().max(120)

const email = module.exports.email = Joi.string()//.email({ tlds: { allow: false } })

const mobile = module.exports.mobile = Joi.string()

const ID = module.exports.ID = Joi.any()
// .custom((value, helper) => {
//   if (ObjectID.isValid(value)) return true
//   return helper.message("Invalid ObjectID")
// })

const rate = module.exports.rate = Joi.number().min(0).max(5)
const playerNo = module.exports.playerNo = Joi.number().min(0).max(99)
const matchTime = module.exports.matchTime = Joi.number().min(0).max(120)

const bDate = module.exports.bDate = Joi.date().max('1-1-2007')
const futureDate = module.exports.futureDate = Joi.date().min('now')
