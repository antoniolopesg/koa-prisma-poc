import Joi from 'joi'
import { Context, Next } from 'koa'
import { AppError } from '@/appError'

export function validateBody (schema: Joi.Schema) {
  return async (ctx: Context, next: Next) => {
    const { error } = Joi.compile(schema).validate(ctx.request.body)

    if (error !== undefined) {
      const errorMessage = error
        .details
        .map(detail => detail.message)
        .join(', ')

      throw new AppError(400, errorMessage)
    }

    return await next()
  }
}
