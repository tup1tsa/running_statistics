import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { findUserByTokenFactory } from "../../../application/database/queries/findUserByToken";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("findUsersByToken");
  done();
});

afterAll(async done => {
  closeTestDb(connection);
  done();
});

it("should return null if there are no users with that token", async done => {
  const collectionName = "noUsers";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db
    .collection(collectionName)
    .insertOne({ name: "some name", accessToken: "wrong token" });
  const result = await findUserByTokenFactory(getConfig, "different token")(
    connection.db
  );
  expect(result).toBe(null);
  done();
});

it("should return correct user if it is present", async done => {
  const collectionName = "userWithToken";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const correctUser = {
    name: "correct name",
    accessToken: "correct token",
    _id: "456"
  };
  await connection.db
    .collection(collectionName)
    .insertMany([
      { name: "some name", accessToken: "wrong token", _id: "23" },
      correctUser
    ]);
  const result = await findUserByTokenFactory(getConfig, "correct token")(
    connection.db
  );
  expect(result).toEqual(correctUser);
  done();
});
