const Joi = require('joi')
const { ID, title, rate, email, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  variety: title.required(),
  payload: Joi.any(),
  target: ID,
  model: title
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs);


