import * as _ from "lodash";
import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import {
  saveNewUser,
  UserInfoHashed
} from "../../../application/database/queries/saveNewUser";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("newUserDb");
  done();
});

afterAll(async done => {
  await closeTestDb(connection);
  done();
});

it("should save new user correctly", async done => {
  const collectionName = "saveUsers";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const userInfo: UserInfoHashed = {
    name: "Vanya",
    email: "fancy@gmail.com",
    passwordHash: "very long password hash",
    salt: "some salt",
    accessToken: "any token"
  };
  await saveNewUser(getConfig, userInfo)(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(userInfo);
  done();
});

it("should throw if name, email or token is already in use", async done => {
  const collectionName = "uniqueUsers";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const users: UserInfoHashed[] = [
    {
      name: "Vanya",
      email: "fancy@gmail.com",
      passwordHash: "very long password hash",
      salt: "some salt",
      accessToken: "access token"
    },
    {
      name: "Cristina",
      email: "fancy@gmail.com",
      passwordHash: "very long password hash",
      salt: "some salt",
      accessToken: "unique"
    },
    {
      name: "Vanya",
      email: "different@gmail.com",
      passwordHash: "very long password hash",
      salt: "some salt",
      accessToken: "another unique token"
    },
    {
      name: "unique name",
      email: "unique email",
      passwordHash: "any hash",
      salt: "some salt",
      accessToken: "access token"
    }
  ];
  await saveNewUser(getConfig, users[0])(connection.db);
  await expect(
    saveNewUser(getConfig, users[1])(connection.db)
  ).rejects.toThrow();
  await expect(
    saveNewUser(getConfig, users[2])(connection.db)
  ).rejects.toThrow();
  await expect(
    saveNewUser(getConfig, users[3])(connection.db)
  ).rejects.toThrow();
  done();
});
