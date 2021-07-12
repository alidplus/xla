const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./utils')

const attrs = {
  // _id: ID,
  title: title.required(),
  text: title,
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


