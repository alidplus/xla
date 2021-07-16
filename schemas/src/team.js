import Joi from 'joi'
import { ID, title, password, email, mobile } from './partials'

export const attrs = {
  // _id: ID,
  title: Joi.object().keys({
    fa: title.required(),
    en: title,
    abr: Joi.string().uppercase().length(3)
  }).required(),
  owner: ID.required(),
  form: Joi.object().keys({
    gk: ID.required(),
    ca: ID.required(),
    p1: ID.required(),
    p2: ID.required(),
    p3: ID.required(),
  })
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)


