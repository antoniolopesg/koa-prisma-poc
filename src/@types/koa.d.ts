// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Context } from 'koa'
import type { User } from '@prisma/client'

declare module 'koa' {
  /**
     * See https://www.typescriptlang.org/docs/handbook/declaration-merging.html for
     * more on declaration merging
     */
  interface Context {
    user?: User
  }
}
