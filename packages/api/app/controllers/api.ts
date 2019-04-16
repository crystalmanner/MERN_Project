import Router from 'koa-router';
const fs = require('fs');
import models from '../models/models';
import { forEach, map } from 'p-iteration';
import { create } from './create';
import { update } from './update';
import { readLogic } from './read';
import { deleteById } from './delete';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const db = mongoose.connection;

const router = new Router({
  prefix: '/',
});

export type DocType<T = any> = {
  [key: string] : T, 
}
export type ModelType <T = any> = {
  model: string,
  docs: T extends ModelType<infer R> ? ModelType<R>[] : DocType[],
}

export type CreateRes = {
  ids: Array<ObjectId>;
  data: Array<mongoose.Document>;
};
const toArrayWithKey = (obj: DocType) =>
  Object.keys(obj).map(key => ({ key, value: obj[key] }));

const insertDoc = async (doc: ModelType | DocType, model: string): Promise<mongoose.Document> => {
  const dataObject: {
    [key: string] : mongoose.Document | mongoose.Document[]
  } = {};
  const docFields = toArrayWithKey(doc);
  await forEach(docFields, async field => {
    const { key, value } = field;
    if (value.model && models[value.model]) {
      // This is a model type
      const insertedModel = await insertModel(value);
      dataObject[key] = insertedModel.data
    } else {
      // This is a primitive value
      dataObject[key] = value;
    }
  });
  const savedDoc = await models[model].create(dataObject);
  return savedDoc
};

export const insertModel = async (modelData: ModelType | DocType): Promise<CreateRes> => {
  const { model, docs } = modelData;
  const insertedDocs = await map(docs, doc => insertDoc(doc, model));
  const ids = insertedDocs.map(doc => doc._id);
  return {
    ids,
    data: insertedDocs
  }
};

export const clearModel = async (data: ModelType) => {
  const { model } = data;
  const Model = models[model];
  await Model.deleteMany({});
};

router.post('/', (ctx, next) => {
  ctx.body = 'Server Started!';
});

export async function apiRequest(ctx: Router.IRouterContext & { request: any; }) {
  switch (ctx.request.body.action) {
    case 'create':
      return await create(ctx.request.body.data);
    case 'update':
      return await update(ctx.request.body);
    case 'read':
      return await readLogic(ctx.request.body);
    case 'delete':
      return await deleteById(ctx.request.body);
    default:
      break;
  }
}
router.post('api', apiRequest);
export default router;
