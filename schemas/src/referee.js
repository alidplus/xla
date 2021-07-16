import Joi from 'joi'
import { ID, title, rate, email, mobile } from './partials'

export const attrs = {
  name: title.required(),
  lvl: rate,
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)


