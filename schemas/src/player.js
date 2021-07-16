import Joi from 'joi'
import { ID, title, playerNo, bDate, mobile } from './partials'

export const attrs = {
  name: title.required(),
  no: playerNo.required(),
  bDate: bDate.required(),

  team: ID
}

export const options = { convert: true, abortEarly: false, allowUnknown: true }

export const schema = Joi.object().keys(attrs)


