const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./utils')

const attrs = {
  // _id: ID,
  title: Joi.object().keys({
    fa: title.required(),
    en: title,
    abr: title.length(3)
  }).required(),
  owner: ID.required(),
  form: Joi.object().keys({
    gk: ID.required(),
    ca: ID.required(),
    p1: ID.required(),
    p2: ID.required(),
    p3: ID.required(),
  })
}

const options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports = { schema, attrs, options };


