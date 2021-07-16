import Joi from 'joi'
import { ID, title, rate, email, mobile } from './partials'

export const attrs = {
  variety: title.required(),
  payload: Joi.any(),
  target: ID,
  model: title
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs);


