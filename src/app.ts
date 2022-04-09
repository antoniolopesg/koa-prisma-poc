import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa()

app.use(koaBody({ json: true }))

export default app
