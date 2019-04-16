import Koa from 'koa'
import mongoose from 'mongoose'
import config from './config/config'
import withMiddleware from './config/middleware'
import withRoutes from './config/routes'

/**
 * Setup App
 */
const app = new Koa()
if(!config.db) {
  throw Error('DB not provided in env ')
}
mongoose.connect(config.db)

/**
 * Add HOC
 */
withMiddleware(app)
withRoutes(app)

/**
 * Connect Server
 */
app.listen(config.port)
