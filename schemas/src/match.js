
import Joi from 'joi'
import { ID, title, playerNo, futureDate, mobile } from './partials'

export const attrs = {

  time: futureDate.required(),
  results: Joi.object(),

  home: ID,
  away: ID,
  league: ID,
  referee: ID
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)


