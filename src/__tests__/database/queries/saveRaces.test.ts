import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { saveRaces } from "../../../application/database/queries/saveRaces";

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
    type: "running",
    path: [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 }
    ]
  };
  const query = saveRaces(getConfig, [race]);
  await query(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(race);

  done();
});
