
export const config = {
  PORT: Number(process.env.PORT) || 3333,
  SECRET: process.env.SECRET ?? 'secret'
}
