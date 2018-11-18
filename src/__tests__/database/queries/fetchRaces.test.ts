import * as _ from "lodash";
import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { fetchRaces } from "../../../application/database/queries/fetchRaces";

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
  const getConfig = jest.fn().mockReturnValue({
    collections: { races: "fetchRaces" }
  });
  const race = {
    type: "walking",
    path: [
      { latitude: 42, longitude: 44, time: 323 },
      { latitude: 17, longitude: 23, time: 323 }
    ]
  };
  await connection.db.collection("fetchRaces").insertOne(race);
  const races = await fetchRaces(getConfig)(connection.db);
  expect(races).toEqual([race]);
  done();
});