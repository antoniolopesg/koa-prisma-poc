import { Context } from 'koa'
import { signinService } from './authServices'

interface SignInRequestBody {
  username: string
  password: string
}

export async function signInHandler (ctx: Context): Promise<void> {
  const { username, password } = ctx.request.body as SignInRequestBody

  const signin = await signinService(username, password)

  ctx.body = signin
}
