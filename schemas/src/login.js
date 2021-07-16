import Joi from 'joi'
import { password, email } from './partials'

export const attrs = {
  email: email.required(),
  password: password.required(),
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)



