import Joi from 'joi'
import { ID, title, playerNo, futureDate, mobile } from './partials'

export const attrs = {

  title: title.required(),
  text: title,
  teams: Joi.number(),
  homeAway: Joi.bool(),

  results: Joi.object(),

  sponsor: ID,
  participants: Joi.array().items(ID),
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs);


