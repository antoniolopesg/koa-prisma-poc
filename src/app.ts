import Koa from 'koa'
import koaBody from 'koa-body'
import Router from '@koa/router'

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
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

app.use(guestRouter.routes())

app.use(ctx => {
  ctx.body = {
    message: 'Not found'
  }
  ctx.status = 404
})

export default app
