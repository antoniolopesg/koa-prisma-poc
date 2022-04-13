
import type { Config } from './@types/node'

export const config: Config = {
  PORT: Number(process.env.PORT) || 3333,
  SECRET: process.env.SECRET ?? 'secret'
}
