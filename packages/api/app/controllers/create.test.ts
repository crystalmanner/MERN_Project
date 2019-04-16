import mongoose from 'mongoose';
let MongoEnvironment = require('../../test/mongo-environment');
const sinon = require('sinon');
import * as api from 'app/controllers/api';
import { buildModel } from 'app/models/models';
import models from 'app/models/models';
import { readLogic } from 'app/controllers/read';
import { createData } from 'data/create-data';
import { create } from 'app/controllers/create';
import { forEach } from 'p-iteration';
const fs = require('fs');
let connection;
let db;
import mongoConfig from '../../test/globalConfig.json';
import { CreateInput } from 'data/InputData';
import { mongooseConnect } from 'helpers/mongo-test-helpers';
import { Schema } from 'mongoose';

beforeAll(async () => {
  await mongooseConnect()
});

test('Integration test -> Mongoose Connection Check ', () => {
  expect(mongoose.connection.readyState).toBe(1);
});

test('Integration test -> create.js  ', async done => {
  // Clear data

  // TODO: provide types schema
  const schema = JSON.parse(fs.readFileSync('data/schema.json', 'utf8'));
  // schema.forEach(model => clearModel(model));
  await forEach(schema, async (model: any) => {
    await api.clearModel(model);
  });
  // Create
  // console.log(createData)
  const requestBody: CreateInput = {
        action: 'create',
        data: createData,
      }
  const mockedCtx: any = {
    request: {
      body: requestBody,
    },
  };

  const createdData = await api.apiRequest(mockedCtx);

  const Restaurant = mongoose.model('Restaurant');
  const restaurants = await Restaurant.find({});
  const firstModelDocs = createData[0].docs;

  const data = createdData[0].data;

  expect(createdData[0].ids).toHaveLength(3)
  expect(createdData[0].data).toHaveLength(3)
  firstModelDocs.forEach( modelValue=> {
    const foundVal = data.find((val:any) => val.name === modelValue.name);
    expect(foundVal.rating).toEqual(Number.parseInt(modelValue.rating))
    expect(foundVal.name).toEqual(modelValue.name)
    expect(foundVal.menus).toHaveLength(2)
  })
  expect(restaurants.length).toBe(3);
  done();
});


/**
 * We want to test that insertModel() is called with appropriate arguments.
 *
 * insertModel() takes an argument
 */
test('it should call insertModel() on create()', async () => {
  const insertStub = sinon.stub(api, 'insertModel');

  await create(createData);

  insertStub.restore();

  // createData.forEach(data => {
  // });

  sinon.assert.calledWith(insertStub, createData[0]);
});
