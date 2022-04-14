// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Context } from 'koa'

declare module 'koa' {
  /**
     * See https://www.typescriptlang.org/docs/handbook/declaration-merging.html for
     * more on declaration merging
     */
  interface Context {
    user?: {
      id: number
    }
  }
}
