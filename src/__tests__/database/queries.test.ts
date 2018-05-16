import { MongoClientInstance, Db, connect } from '../../database/databaseWrappers';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { getSaveRunQuery } from '../../database/queries';

describe('database queries', () => {

  let client: MongoClientInstance;
  let db: Db;
  const collection = 'runs';

  beforeAll(() => dotenv.load());

  beforeEach(async (done) => {
    const result = await connect(process.env, MongoClient);
    client = result.client;
    db = result.db;
    done();
  });

  afterEach(async (done) => {
    await db.dropDatabase();
    await client.close();
    done();
  });

  it('save runs query', async (done) => {
    const runs = [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 },
    ];
    const query  = getSaveRunQuery(collection, [runs]);
    const result = await query(db);
    expect(result.insertedCount).toEqual(1);
    done();
  });
});