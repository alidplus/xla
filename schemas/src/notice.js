const Joi = require('joi')
const { ID, title } = require('./partials')
const attrs = module.exports.attrs = {
  title: title.required(),
  lead: Joi.string(),
  body: Joi.string().required(),
  slug: Joi.string(),

  sponsor: ID,
  league: ID,
  leagueTeam: ID,
  match: ID,
  leaguePlayer: ID,
  referee: ID,
}

const options = module.exports.options = { convert: true, abortEarly: false, allowUnknown: true }

const schema = Joi.object().keys(attrs)

module.exports.schema = Joi.alternatives().try(schema, Joi.array().items(schema))

const fields = module.exports.fields = Object.keys(attrs);


