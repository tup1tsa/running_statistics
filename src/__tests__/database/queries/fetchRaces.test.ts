import * as _ from "lodash";
import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { fetchRacesFactory } from "../../../application/database/queries/fetchRaces";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("fetchRacesDb");
  done();
});

afterAll(async done => {
  closeTestDb(connection);
  done();
});

it("should fetch races correctly without sensitive data", async done => {
  const collectionName = "fetchRacesSuccess";
  const getConfig = jest.fn().mockReturnValue({
    collections: { races: collectionName }
  });
  const userId = "bast";
  const path = [
    { latitude: 42, longitude: 44, time: 323 },
    { latitude: 17, longitude: 23, time: 62326 }
  ];
  const races = [
    {
      _id: "1252",
      type: "walking",
      userId,
      path
    },
    { _id: "262256", type: "running", userId: "helm", path: [] }
  ];
  await connection.db.collection(collectionName).insertMany(races);
  const fetchedRaces = await fetchRacesFactory(getConfig, userId)(
    connection.db
  );
  expect(fetchedRaces).toEqual([{ type: "walking", path }]);
  done();
});

it("should return empty array if there are no races", async done => {
  const collectionName = "fetchRacesFail";
  const getConfig = jest.fn().mockReturnValue({
    collections: { races: collectionName }
  });
  const userId = "bast";
  const races = [
    {
      type: "walking",
      userId: "helm",
      path: [
        { latitude: 42, longitude: 44, time: 323 },
        { latitude: 17, longitude: 23, time: 323 }
      ]
    }
  ];
  await connection.db.collection(collectionName).insertMany(races);
  const fetchedRaces = await fetchRacesFactory(getConfig, userId)(
    connection.db
  );
  expect(fetchedRaces).toEqual([]);

  done();
});
