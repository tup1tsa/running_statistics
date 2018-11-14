import { Connection } from "../../../server/database/databaseWrappers";
import {
  saveNewUser,
  UserInfo
} from "../../../server/database/queries/saveNewUser";
import { closeTestDb } from "../../../testHelpers/closeTestDb";
import { prepareTestDb } from "../../../testHelpers/prepareTestDb";

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
  const collectionName = "users";
  const userInfo: UserInfo = {
    name: "Vanya",
    email: "fancy@gmail.com",
    passwordHash: "very long password hash"
  };
  await saveNewUser(collectionName, userInfo)(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(userInfo);
  done();
});
