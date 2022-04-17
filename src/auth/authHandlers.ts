import type { KoaContext } from '@/app'
import { signinService } from './authServices'

interface SignInRequestBody {
  username: string
  password: string
}

export async function signInHandler (ctx: KoaContext<SignInRequestBody>): Promise<void> {
  const { username, password } = ctx.request.body!

  const signin = await signinService(username, password)

  ctx.response.body = signin
}
