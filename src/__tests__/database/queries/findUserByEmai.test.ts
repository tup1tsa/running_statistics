import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { findUserByEmailFactory } from "../../../application/database/queries/findUserByEmail";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("findUserByEmail");
  done();
});

afterAll(async done => {
  closeTestDb(connection);
  done();
});

it("should return null if email is not in db", async done => {
  const collectionName = "findByEmailFail";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const factory = findUserByEmailFactory("non-existent@gmai.com", getConfig);
  await connection.db
    .collection(collectionName)
    .insertMany([
      { name: "any", email: "some email" },
      { name: "another one", email: "some different email" }
    ]);
  const result = await factory(connection.db);
  expect(result).toBe(null);
  done();
});

it("should return user if email is in db", async done => {
  const collectionName = "findByEmailSuccess";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const factory = findUserByEmailFactory("fancy@gmail.com", getConfig);
  const jack = { name: "Jack", email: "fancy@gmail.com", _id: "23" };
  await connection.db
    .collection(collectionName)
    .insertMany([
      jack,
      { name: "another one", email: "some different email", _id: "34" }
    ]);
  const result = await factory(connection.db);
  expect(result).toEqual(jack);
  done();
});
