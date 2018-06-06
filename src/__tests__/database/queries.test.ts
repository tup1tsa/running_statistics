import { connect } from '../../database/databaseWrappers';
import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
import { fetchRaces, saveRaces } from '../../database/queries';
import { getConnectionInfo } from '../../database/getConnectionInfo';

describe('database queries', () => {

  let client: MongoClient;
  let db: Db;
  const collection = 'races';

  beforeAll(() => dotenv.load());

  beforeEach(async (done) => {
    const connectionInfo = getConnectionInfo(process.env);
    const result = await connect(connectionInfo.uri, connectionInfo.dbName);
    client = result.clientInstance;
    db = result.db;
    done();
  });

  afterEach(async (done) => {
    await db.dropDatabase();
    await client.close();
    done();
  });

  it('should save runs correctly', async (done) => {
    const race = {
      type: 'running',
      path: [
        { latitude: 42, longitude: 44, time: 323 },
        { latitude: 17, longitude: 23, time: 323 },
      ]
    };
    const query  = saveRaces(collection, [race]);
    await query(db);
    const cursor = await db.collection('races').find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(1);
    expect(docs[0]).toEqual(race);
    done();
  });

  it('should fetch runs correctly', async (done) => {
    const race = {
      type: 'walking',
      path: [
        { latitude: 42, longitude: 44, time: 323 },
        { latitude: 17, longitude: 23, time: 323 },
      ]
    };
    const saveRunsQuery  = saveRaces(collection, [race]);
    await saveRunsQuery(db);
    const fetchRunsQuery = fetchRaces(collection);
    const runs = await fetchRunsQuery(db);
    expect(runs).toEqual([race]);
    done();
  });
});