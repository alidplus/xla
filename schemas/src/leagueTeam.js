const Joi = require('joi')
const { ID, title, password, email, mobile } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  
    team: ID,
    league: ID,

}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs)


