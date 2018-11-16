import * as _ from "lodash";
import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import {
  saveNewUser,
  UserInfo
} from "../../../application/database/queries/saveNewUser";
import { getTestConfig } from "../../../testHelpers/getTestConfig";

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
  const config = getTestConfig({
    collection: { key: "users", value: collectionName }
  });
  const userInfo: UserInfo = {
    name: "Vanya",
    email: "fancy@gmail.com",
    passwordHash: "very long password hash"
  };
  await saveNewUser(config, userInfo)(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(userInfo);
  done();
});
