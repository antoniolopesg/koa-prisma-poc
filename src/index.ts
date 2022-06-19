import './alias'

import http from 'http'
import app from './app'
import { config } from './config'
import { prisma } from './lib/prisma'

async function main (): Promise<void> {
  const server = http.createServer(app.callback())

  server.listen(config.PORT, () => {
    console.log(`server listening on: http://localhost:${config.PORT}`)
  })
}

prisma
  .$connect()
  .then(main)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
