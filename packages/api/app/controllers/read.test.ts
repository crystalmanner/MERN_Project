import mongoose from 'mongoose';
const fs = require('fs');
import mongoConfig from '../../test/globalConfig.json';
import { readLogic } from './read';
import { create } from './create';
import { createData } from 'data/create-data';
import { readAll } from 'data/read/readAll';
import { readDataFilter } from 'data/read/read-data-filter';
import { readColumnFilter } from 'data/read/read-column-filter';
import { clearModel, apiRequest } from './api';
import { map, forEach } from 'p-iteration';
import { mongooseConnect } from 'helpers/mongo-test-helpers';
import { readDataSort } from 'data/read/read-column-sort';
/**
 * Before test run, checking is mongoose connection ready or not
 */
let schema: any;
beforeAll(async () => {
  await mongooseConnect();

  schema = JSON.parse(fs.readFileSync('data/schema.json', 'utf8'));
});
beforeEach(async () => {
  await forEach(schema, async (model: any) => {
    await clearModel(model);
  });
});
/**
 * Mongoose Connection test on read.test.js
 * If connection is ready, actual status will be 1, if not connected then status will be 0
 */
test('Integration test -> Mongoose Connection Check on delete.js', () => {
  expect(mongoose.connection.readyState).toBe(1);
});

/**
 *@function readLogic
 *@param {model: string, action: string, where: Object}
 *@description Test readAll
 */
test('IntegraTest: read All', async done => {
  await create(createData);
  const mockedCtx: any = {
    request: {
      body: readAll,
    },
  };
  const readData: any[] = await apiRequest(mockedCtx);
  const firstModelDocs = createData[0].docs;

  firstModelDocs.forEach(value => {
    const foundReadValue = readData.find(
      readValue => readValue.name === value.name,
    );
    expect(foundReadValue.rating).toEqual(Number.parseInt(value.rating));
    expect(foundReadValue.name).toEqual(value.name);
    expect(foundReadValue.menus).toHaveLength(2);
  });
  expect(readData.length).toBe(3);
  done();
});

test('IntegreTest: read where GREATHERTHAN', async done => {
  await create(createData);
  const mockedCtx: any = {
    request: {
      body: readDataFilter,
    },
  };
  const readData: any[] = await apiRequest(mockedCtx);
  const firstModelDocs = createData[0].docs;

  const givenModelDoc = firstModelDocs[0];
  expect(givenModelDoc.name).toEqual(readData[0].name);
  expect(Number(givenModelDoc.rating)).toEqual(readData[0].rating);

  expect(readData.length).toBe(1);
  done();
});

test('IntegreTest: read where LESSTHAN', async done => {
  await create(createData);

  const readDataFilterLessthan = {
    action: 'read',
    model: 'Restaurant',
    where: [
      {
        field: 'rating',
        operator: 'LESSTHAN',
        maxValue: 4,
        minValue: 3,
      },
    ],
  };
  const mockedCtx: any = {
    request: {
      body: readDataFilterLessthan,
    },
  };
  const readData: any[] = await apiRequest(mockedCtx);
  const firstModelDocs = createData[0].docs;

  firstModelDocs.forEach(value => {
    const foundReadValue = readData.find(
      readValue => readValue.name === value.name,
    );
    expect(foundReadValue.rating).toEqual(Number.parseInt(value.rating));
    expect(foundReadValue.name).toEqual(value.name);
    expect(foundReadValue.menus).toHaveLength(2);
  });
  expect(readData.length).toBe(3);
  done();
});
test('IntegreTest: read where EQUALS', async done => {
  await create(createData);

  const readDataFilterEquals = {
    action: 'read',
    model: 'Restaurant',
    where: [
      {
        field: 'rating',
        operator: 'EQUALS',
        value: 3
      },
    ],
  };
  const mockedCtx: any = {
    request: {
      body: readDataFilterEquals,
    },
  };
  const readData: any[] = await apiRequest(mockedCtx);
  const firstModelDocs = createData[0].docs;

  const givenModelDoc = firstModelDocs[0];
  expect(givenModelDoc.name).toEqual(readData[0].name);
  expect(Number(givenModelDoc.rating)).toEqual(readData[0].rating);

  expect(readData.length).toBe(1);
  done();
})
test('IntegreTest: read column filter', async done => {
  await create(createData);
  const mockedCtx: any = {
    request: {
      body: readColumnFilter,
    },
  };
  const readData: any[] = await apiRequest(mockedCtx);
  const firstModelDocs = createData[0].docs;
  firstModelDocs.forEach(value => {
    const foundReadValue = readData.find(
      readValue => readValue.name === value.name,
    );
    expect(foundReadValue.rating).toEqual(Number.parseInt(value.rating));
    expect(foundReadValue.name).toEqual(value.name);
    // menu should be excluded
    expect(foundReadValue.menus).toBeUndefined();
  });
  done();
});

test('IntegreTest: read sort ASC', async done => {
  await create(createData);
  const mockedCtx: any = {
    request: {
      body: readDataSort
    }
  }
  const readData: any[] = await apiRequest(mockedCtx);
  const ratings = readData.map(value => Number(value.rating));
  expect(ratings).toEqual([1,2,3]);
  done();
})

test('IntegreTest: read sort DSC', async done => {
  await create(createData);
  const mockedCtx: any = {
    request: {
      body:  {
        "action": "read",
        "model": "Restaurant",
        "sort": [
        {
          "field": "rating",
          "operator": "DESC"
        }
       ]
      }
    }
  }

  const readData: any[] = await apiRequest(mockedCtx);
  const ratings = readData.map(value => Number(value.rating));
  expect(ratings).toEqual([3,2,1]);
  done()
})
