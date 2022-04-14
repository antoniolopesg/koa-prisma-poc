import * as Joi from 'joi'

export const createAccountSchema = Joi.object().keys({
  name: Joi.string().trim().required()
})
