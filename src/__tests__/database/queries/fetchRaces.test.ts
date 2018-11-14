import { Connection } from "../../../server/database/databaseWrappers";
import { fetchRaces } from "../../../server/database/queries/fetchRaces";
import { closeTestDb } from "../../../testHelpers/closeTestDb";
import { prepareTestDb } from "../../../testHelpers/prepareTestDb";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("fetchRacesDb");
  done();
});

afterAll(async done => {
  closeTestDb(connection);
  done();
});

it("should fetch races correctly", async done => {
  const collectionName = "fetchRaces";
  const race = {
    type: "walking",
    path: [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 }
    ]
  };
  await connection.db.collection(collectionName).insertOne(race);
  const races = await fetchRaces(collectionName)(connection.db);
  expect(races).toEqual([race]);
  done();
});
