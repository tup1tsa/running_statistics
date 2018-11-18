import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { isAccessTokenUniqueFactory } from "../../../application/database/queries/isAccessTokenUnique";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("uniqueToken");
  done();
});

afterAll(async done => {
  await closeTestDb(connection);
  done();
});

const users = [
  {
    name: "any",
    email: "any@gmail.com",
    passwordHash: "asa",
    accessToken: "ab256"
  },
  {
    name: "any",
    email: "any@gmail.com",
    passwordHash: "asa",
    accessToken: "ba45a"
  }
];

it("should return true if  this token is unique", async done => {
  const collectionName = "uniqueToken";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db.collection(collectionName).insertMany(users);
  const result = await isAccessTokenUniqueFactory(getConfig, "ba223")(
    connection.db
  );
  expect(result).toBe(true);
  done();
});

it("should return false if token is not unique", async done => {
  const collectionName = "nonUniqueToken";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db.collection(collectionName).insertMany(users);
  const result = await isAccessTokenUniqueFactory(
    getConfig,
    users[0].accessToken
  )(connection.db);
  expect(result).toBe(false);
  done();
});
