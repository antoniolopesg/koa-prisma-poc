import './alias'

import http from 'http'
import app from './app'
import { config } from './config'

async function main (): Promise<void> {
  const server = http.createServer(app.callback())

  server.listen(config.PORT, () => {
    console.log(`server listening on: http://localhost:${config.PORT}`)
  })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
