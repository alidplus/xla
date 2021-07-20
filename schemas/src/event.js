const Joi = require('joi')
const { ID, matchTime } = require('./partials')

module.exports = {}



const attrs = module.exports.attrs = {
  league: ID.required(),
  match: ID.required(),
  team: Joi.string().required(),
  player: ID.required(),
  eType: Joi.string().required(),
  time: matchTime.required(),
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = module.exports.schema = Joi.object().keys(attrs);


