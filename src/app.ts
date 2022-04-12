import Koa from 'koa'
import koaBody from 'koa-body'
import Router from '@koa/router'
import { signInHandler, signInSchema } from '@/auth'
import { validateBody } from '@/middlewares'
import { AppError } from './appError'

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof AppError) {
      ctx.status = err.statusCode
      ctx.body = {
        message: err.message
      }
      return
    }

    ctx.status = 500
    ctx.body = {
      message: 'Unknown Error'
    }
  }
})

const guestRouter = new Router()

app.use(koaBody({ json: true }))

// Open Routes
guestRouter.get('/', ctx => {
  ctx.status = 200
  ctx.body = {
    message: 'Hello Whats Grupos :)'
  }
})

guestRouter.post('/api/signin', validateBody(signInSchema), signInHandler)

app.use(guestRouter.routes())

app.use(ctx => {
  ctx.body = {
    message: 'Not found'
  }
  ctx.status = 404
})

export default app
