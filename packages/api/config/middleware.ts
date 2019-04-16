const cors = require('@koa/cors')
const koaBody = require('koa-bodyparser')

const withMiddleware = (app: any) => {
  app.use(koaBody())
  app.use(cors())
}

export default withMiddleware
