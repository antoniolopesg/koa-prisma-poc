import { KoaContext } from '@/app'
import { createAccountService } from './accountServices'

interface CreateAccountRequestBody {
  name: string
}

export async function createAccountHandler (ctx: KoaContext<CreateAccountRequestBody>): Promise<void> {
  const { name } = ctx.request.body!

  await createAccountService(name, ctx.user!)

  ctx.response.status = 201
}
