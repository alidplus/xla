import Joi from 'joi'

export const title = Joi.string().trim().min(3).max(30)

export const password = Joi.string().trim().min(5).max(30)
  .regex(/^[\sa-zA-Z0-9]*$/, 'letters, numbers and spaces')

export const fullName = Joi.string().trim().max(30)

export const address = Joi.string().trim().max(120)

export const email = Joi.string()//.email({ tlds: { allow: false } })

export const mobile = Joi.string()

export const ID = Joi.string().length(24).hex()

export const rate = Joi.number().min(0).max(5)
export const playerNo = Joi.number().min(0).max(99)

export const bDate = Joi.date().max('1-1-2007')
export const futureDate = Joi.date().min('now')
