import { Context } from 'koa'
import { createAccountService } from './accountServices'

interface CreateAccountRequestBody {
  name: string
}

export async function createAccountHandler (ctx: Context): Promise<void> {
  const { name } = ctx.request.body as CreateAccountRequestBody

  await createAccountService(name, ctx.user!)

  ctx.response.status = 201
}
