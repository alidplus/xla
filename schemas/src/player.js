const Joi = require('joi')
const { ID, title, playerNo, bDate, mobile } = require('./partials')
const attrs = module.exports.attrs = {
  name: title.required(),
  no: playerNo.required(),
  bDate: bDate.required(),

  team: ID
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)

const fields = module.exports.fields = Object.keys(attrs);


