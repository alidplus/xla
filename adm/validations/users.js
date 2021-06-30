import Joi from 'joi'
import { title, password, email, mobile } from './utils'

export const attrs = {
  username: title.required(),
  email: email.required(),
  mobile: mobile.required(),
  password,
  confirmPassword: password.label('Confirm password'),
}

export const options = { convert: true, abortEarly: false }

export default Joi.object().keys(attrs);


