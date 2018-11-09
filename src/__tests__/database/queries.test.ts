import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { connect } from "../../server/database/databaseWrappers";
import { getConnectionInfo } from "../../server/database/getConnectionInfo";
import { fetchRaces, saveRaces } from "../../server/database/queries";

describe("database queries", () => {
  let client: MongoClient;
  let db: Db;
  const collection = "races";

  beforeAll(() => dotenv.load());

  beforeEach(async done => {
    const connectionInfo = getConnectionInfo(process.env);
    const result = await connect(
      connectionInfo.uri,
      connectionInfo.dbName
    );
    client = result.clientInstance;
    db = result.db;
    done();
  });

  afterEach(async done => {
    await db.dropDatabase();
    await client.close();
    done();
  });

  it("should save races correctly", async done => {
    const race = {
      type: "running",
      path: [
        { latitude: 42, longitude: 44, time: 323 },
        { latitude: 17, longitude: 23, time: 323 }
      ]
    };
    const query = saveRaces(collection, [race]);
    await query(db);
    const cursor = await db.collection("races").find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(1);
    expect(docs[0]).toEqual(race);
    done();
  });

  it("should fetch races correctly", async done => {
    const race = {
      type: "walking",
      path: [
        { latitude: 42, longitude: 44, time: 323 },
        { latitude: 17, longitude: 23, time: 323 }
      ]
    };
    const saveRacesQuery = saveRaces(collection, [race]);
    await saveRacesQuery(db);
    const fetchRacesQuery = fetchRaces(collection);
    const races = await fetchRacesQuery(db);
    expect(races).toEqual([race]);
    done();
  });
});
