import api from '../app/controllers/api'
import deleteApi from '../app/controllers/delete'
import updateApi from '../app/controllers/update'
import readApi from '../app/controllers/read'
import createApi from '../app/controllers/create'
const withRoutes = (app: any) => {
  /**
   * My Endpoints
   */
  app.use(api.routes())
  app.use(deleteApi.routes())
  app.use(updateApi.routes())
  app.use(readApi.routes())
  app.use(createApi.routes())
}

export default withRoutes
