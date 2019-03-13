import { ObjectId } from "bson";
import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { saveRacesFactory } from "../../../application/database/queries/saveRaces";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("saveRacesDb");
  done();
});

afterAll(async done => {
  closeTestDb(connection);
  done();
});

it("should save races correctly", async done => {
  const collectionName = "saveRaces";
  const getConfig = jest.fn().mockReturnValue({
    collections: { races: collectionName }
  });
  const race = {
    _id: "23",
    type: "running",
    path: [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 }
    ]
  };
  const userId = "aba125457854124521527854";
  const query = saveRacesFactory(getConfig, [race], userId);
  await query(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual({ ...race, userId });
  done();
});

it("should convert user id from BSON to string if neccessary", async done => {
  const collectionName = "saveRacesWithConvertion";
  const getConfig = jest.fn().mockReturnValue({
    collections: { races: collectionName }
  });
  const race = {
    _id: "23",
    type: "running",
    path: [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 }
    ]
  };
  const userId = new ObjectId("1".repeat(24));
  const query = saveRacesFactory(getConfig, [race], userId);
  await query(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual({ ...race, userId: "1".repeat(24) });
  done();
});
