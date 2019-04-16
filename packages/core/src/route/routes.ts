import Model from '../modules/Model/data/Model';
import { RouteAction } from './actions';

const nextRoutes = require('next-routes');

const routes = nextRoutes()
  /**
   * Home
   */
  .add({
    name: 'home',
    pattern: '/',
    page: 'index',
  })
  /**
   * model
   */
  .add({
    // name: 'model.index',
    // pattern: '/model',
    name: Model.route(RouteAction.INDEX).name,
    pattern: Model.route(RouteAction.INDEX).pattern,
    page: 'model/index',
  })
  // .add({
  //   // name: 'model.create',
  //   // pattern: '/model/create',
  //   name: Model.route(RouteAction.CREATE).name,
  //   pattern: Model.route(RouteAction.CREATE).pattern,
  //   page: 'model/create',
  // })
  .add({
    name: 'model.detail',
    pattern: '/model/:id',
    page: 'model/detail',
  })
  // .add({
  //   name: 'model.update',
  //   pattern: '/model/:id/update',
  //   page: 'model/update',
  // })
  .add({
    pattern: '/:user/:page',
    page: 'page',
  });

const { Link, Router } = routes;

export { Link, Router };

export default routes;
