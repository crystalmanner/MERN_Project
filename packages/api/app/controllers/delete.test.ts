import mongoose from 'mongoose';
import { deleteById } from 'app/controllers/delete';
const fs = require('fs');

import * as api from './api';
import { readLogic } from './read';
import { create } from './create';
import { createData } from 'data/create-data';
import { map, forEach } from 'p-iteration';
import { DeleteInput } from 'data/InputData';
import { mongooseConnect } from 'helpers/mongo-test-helpers'; 
/**
 * Before test run, checking is mongoose connection ready or not
 */
beforeAll(async () => {
  await mongooseConnect();
});
/**
 * Mongoose Connection test on delete.test.js
 * If connection is ready, actual status will be 1, if not connected then status will be 0
 */
test('Integration test -> Mongoose Connection Check on delete.js', () => {
  expect(mongoose.connection.readyState).toBe(1);
});

/**
 * Before, delete any model data, we need to check model data exist or not;
 * If model data exist, it will delete existed data;
 * If model data not exist, it will put data into model and delete it but deleteById function
 * @param {id: string, model: string}
 */
test('Integration test -> delete.test.js', async done => {
  let readData: any = await readLogic({action: 'read', model: 'Restaurant' });
  let deleteResponse;
  let mockedCtx: any;
  // Clear data
  const schema = JSON.parse(fs.readFileSync('data/schema.json', 'utf8'));
  await forEach(schema, async (model: any) => {
    await api.clearModel(model);
  });
  const insertOutput = await create(createData);
  readData = await readLogic({ action: 'read', model: 'Restaurant' });
  mockedCtx = {
    request: {
      body: <DeleteInput>{
        action: "delete",
        where: { id: readData[0].id },
        model: 'Restaurant',
      },
   },
  }
  deleteResponse = await api.apiRequest(mockedCtx);
  const newReadData: any[] = await readLogic({ action: 'read', model: 'Restaurant'})
  const readDataFilterEquals:any = {
    action: 'read',
    model: 'Restaurant',
    where: [
      {
        field: '_id',
        operator: 'EQUALS',
        value: readData[0].id
      },
    ],
  }
  const deletedRead = await readLogic(readDataFilterEquals)
  expect(newReadData).toHaveLength(readData.length - 1);
  expect(deletedRead).toHaveLength(0)
  expect(deleteResponse.ok).toBe(1);
  done();
});
