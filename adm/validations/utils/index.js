import Joi from 'joi'

export const title = Joi.string().trim().min(5).max(30)
  .regex(/^[\sa-zA-Z0-9]*$/, 'letters, numbers and spaces')

export const password = Joi.string().trim().min(5).max(30)
  .regex(/^[\sa-zA-Z0-9]*$/, 'letters, numbers and spaces')

export const fullName = Joi.string().trim().max(30)

export const address = Joi.string().trim().max(120)

export const email = Joi.string().email({ tlds: { allow: false } })

export const mobile = Joi.string()
