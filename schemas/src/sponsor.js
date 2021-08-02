const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  // _id: ID,
  title: title.required(),
  text: title,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)

const fields = module.exports.fields = Object.keys(attrs);


