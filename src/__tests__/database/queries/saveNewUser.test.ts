import * as _ from "lodash";
import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import {
  saveNewUser,
  UserInfo
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
  const userInfo: UserInfo = {
    name: "Vanya",
    email: "fancy@gmail.com",
    passwordHash: "very long password hash"
  };
  await saveNewUser(getConfig, userInfo)(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(userInfo);
  done();
});

it("should throw if name or email is already in use", async done => {
  const collectionName = "uniqueUsers";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const users: UserInfo[] = [
    {
      name: "Vanya",
      email: "fancy@gmail.com",
      passwordHash: "very long password hash"
    },
    {
      name: "Cristina",
      email: "fancy@gmail.com",
      passwordHash: "very long password hash"
    },
    {
      name: "Vanya",
      email: "different@gmail.com",
      passwordHash: "very long password hash"
    }
  ];
  await saveNewUser(getConfig, users[0])(connection.db);
  await expect(
    saveNewUser(getConfig, users[1])(connection.db)
  ).rejects.toThrow();
  await expect(
    saveNewUser(getConfig, users[1])(connection.db)
  ).rejects.toThrow();
  done();
});
