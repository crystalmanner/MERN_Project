import Router from 'koa-router';
import { insertModel, ModelType, DocType, CreateRes } from './api';
import { createData } from '../../data/create-data';
import { map } from 'p-iteration';
import { Context } from 'koa';
import { ObjectId } from 'bson';
import mongoose from 'mongoose';
const router = new Router({
  prefix: '/create',
});

router.post('/', ctx => {
  create(createData);

  ctx.body = 'Loaded!';
});
export const create = (models: ModelType[] | DocType[]): Promise<CreateRes[]> => {
  return map(models, async model => {
    return await insertModel(model);
  });
};

export default router;
