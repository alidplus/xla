const Joi = require('joi')
const { ID, title, playerNo, bDate, mobile } = require('./utils')

const attrs = {
  name: title.required(),
  no: playerNo.required(),
  bDate: bDate.required(),

  team: ID
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


