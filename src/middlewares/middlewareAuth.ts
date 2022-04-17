import { KoaContext } from '@/app'
import { config } from '@/config'
import { prisma } from '@/lib/prisma'
import { verify } from 'jsonwebtoken'
import { Next } from 'koa'

export const ONLY_AUTHENTICATED_USERS_CAN_ACESS_ERROR = 'Only authenticated users can access this route'

export const INCORRECT_AUTHORIZATION_HEADER_FORMAT = 'Incorrect authorization header format'

export async function auth (ctx: KoaContext, next: Next): Promise<void> {
  const authorizationHeader = ctx.request.headers.authorization?.trim()

  if (!authorizationHeader) {
    ctx.response.status = 401
    ctx.response.body = {
      message: ONLY_AUTHENTICATED_USERS_CAN_ACESS_ERROR
    }
    return
  }

  const authorizationHeaderPattern = /^Bearer .+/

  const correctAuthorizationHeaderFormat = authorizationHeaderPattern.test(authorizationHeader)

  if (!correctAuthorizationHeaderFormat) {
    ctx.response.status = 401
    ctx.response.body = {
      message: INCORRECT_AUTHORIZATION_HEADER_FORMAT
    }
    return
  }

  const [, token] = authorizationHeader.split(' ')

  try {
    const payload = verify(token, config.SECRET)

    const user = await prisma.user.findFirst({
      where: {
        id: Number(payload.sub)
      }
    })

    if (!user) {
      throw new Error()
    }

    ctx.user = user
  } catch (err) {
    ctx.response.status = 401
    ctx.response.body = {
      message: ONLY_AUTHENTICATED_USERS_CAN_ACESS_ERROR
    }
    return
  }

  await next()
}
