import Router from 'src/route/Router';
import { QueryParams, RouteAction } from '../route/actions';

export const getQueryParam = (param, props) => {
  return props.router.query[param];
};

export interface ActionQueryProps {
  param: QueryParams;
  action: RouteAction;
}

export const getVisibilityFromURL = (
  { param, action }: ActionQueryProps,
  props,
) => {
  return getQueryParam(param, props) === action;
};

export const redirectTo = route => {
  Router.pushRoute(route);
};
