import Joi from 'joi'
import { ID, title, playerNo, bDate, mobile } from './partials'

export const attrs = {
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)


