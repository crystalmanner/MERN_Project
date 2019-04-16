import mongoose from 'mongoose';
const fs = require('fs');
import mongoConfig from '../../test/globalConfig.json';
import { readLogic } from './read';
import { create } from './create';
import { createData } from 'data/create-data';
import { readAll } from 'data/read/readAll';
import { clearModel } from './api';
import { map, forEach } from 'p-iteration';
import { update } from './update';
import * as api from './api'
import { ReadInput } from 'data/InputData';
import { mongooseConnect } from 'helpers/mongo-test-helpers';
/**
 * Before test run, checking is mongoose connection ready or not
 */
beforeAll(async () => {
  await mongooseConnect()
});
/**
 * Mongoose Connection test on update.test.js
 * If connection is ready, actual status will be 1, if not connected then status will be 0
 */
test('Integration test -> Mongoose Connection Check on update.test.js', () => {
  expect(mongoose.connection.readyState).toBe(1);
});
/**
 * @function update
 * @param {model: string, where: {id: string}, data: {menu: string}}
 */
test('Integration test -> update.test.js', async done => {
  const schema = JSON.parse(fs.readFileSync('data/schema.json', 'utf8'));
  await forEach(schema, async (model: any) => {
    await clearModel(model);
  });

  const insertOutput = await create(createData);
  const readData:any = await readLogic(readAll as ReadInput);
  const mockedCtx:any = {
    request: {
      body: {
        action: "update",
        model: 'Restaurant',
        where: { id: readData[0]._id },
        data: { name: 'McDonalds Updated' },
      },
    },
  }
  const updatedValue = await api.apiRequest(mockedCtx);
  expect(updatedValue._id.toString()).toBe(readData[0]._id.toString());
  expect(updatedValue.name).toEqual(mockedCtx.request.body.data.name)
  done();
});
