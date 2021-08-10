const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  // _id: ID,
  title: Joi.object().keys({
    fa: title.required(),
    en: title,
    abr: Joi.string().uppercase().length(3)
  }).required(),
  owner: ID.required(),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)

const fields = module.exports.fields = Object.keys(attrs);


