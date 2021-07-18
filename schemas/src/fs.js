const Joi = require('joi')
const { ID, title, playerNo, bDate, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)


