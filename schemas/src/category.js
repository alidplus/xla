const Joi = require('joi')
const { ID, title } = require('./partials')
const attrs = module.exports.attrs = {
  title: title.required(),
  slug: Joi.string(),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)

const fields = module.exports.fields = Object.keys(attrs);


