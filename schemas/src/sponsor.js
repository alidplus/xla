import Joi from 'joi'
import { ID, title, password, email, mobile } from './partials'

export const attrs = {
  // _id: ID,
  title: title.required(),
  text: title,
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)


