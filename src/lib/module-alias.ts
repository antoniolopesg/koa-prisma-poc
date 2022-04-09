import { addAlias } from 'module-alias'
import { resolve } from 'node:path'

addAlias('@', resolve(process.env.TS_NODE_DEV !== undefined ? 'src' : 'dist'))
