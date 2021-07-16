import Joi from 'joi'
import { ID, title, password, email, mobile } from './partials'

export const attrs = {
  // _id: ID,
  name: title.required(),
  email: email.required(),
  mobile: mobile.required(),
  // password,
  // confirmPassword: password.label('Confirm password'),
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs);


