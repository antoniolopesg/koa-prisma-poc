import Koa, { Context, DefaultState, Request } from 'koa'
import koaBody from 'koa-body'
import Router from '@koa/router'
import { signInHandler } from '@/auth/authHandlers'
import { signInSchema } from '@/auth/authSchemas'
import { validateBody } from '@/middlewares/middlewareValidateBody'
import { AppError } from './appError'
import { auth } from './middlewares/middlewareAuth'
import { createAccountSchema } from './account/accountSchemas'
import { createAccountHandler } from './account/accountHandlers'
import { User } from '@prisma/client'

export interface KoaRequest<RequestBody = any> extends Request {
  body?: RequestBody
}

export interface KoaContext<RequestBody = any> extends Context {
  request: KoaRequest<RequestBody>
  user?: User
}

const app = new Koa<DefaultState, KoaContext>()

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
const authRouter = new Router()

app.use(koaBody({ json: true }))

// Open Routes
guestRouter.get('/', ctx => {
  ctx.status = 200
  ctx.body = {
    message: 'My Koa poc'
  }
})

guestRouter.post('/api/signin', validateBody(signInSchema), signInHandler)

// Protected Routes
authRouter.use(auth)

authRouter.post('/api/accounts', validateBody(createAccountSchema), createAccountHandler)

app.use(guestRouter.routes())
app.use(authRouter.routes())

app.use(ctx => {
  ctx.body = {
    message: 'Not found'
  }
  ctx.status = 404
})

export default app
