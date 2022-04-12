import * as Joi from 'joi'

export const signInSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
})
