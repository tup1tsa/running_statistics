import { connect } from '../../database/databaseWrappers';
import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
import { saveRuns } from '../../database/queries';
import { getConnectionInfo } from '../../database/getConnectionInfo';

describe('database queries', () => {

  let client: MongoClient;
  let db: Db;
  const collection = 'runs';

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
    const run = [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 },
    ];
    const query  = saveRuns(collection, [run]);
    await query(db);
    const cursor = await db.collection('runs').find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(1);
    expect(docs[0].points).toEqual(run);
    expect(docs[0].type).toBe('run');
    done();
  });
});