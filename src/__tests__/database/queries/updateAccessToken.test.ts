import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { HashedUserInfo } from "running_app_core";
import { updateAccessTokenFactory } from "../../../application/database/queries/updateAccessToken";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("updateAccessTokenDb");
  done();
});

afterAll(async done => {
  await closeTestDb(connection);
  done();
});

const defaultUserInfo: HashedUserInfo = {
  name: "Sasha",
  email: "some@gmail.com",
  passwordHash: "some hasherino",
  salt: "",
  accessToken: ""
};

it("should create and save new user access token", async done => {
  const collectionName = "token1";
  const getConfig = jest.fn().mockReturnValue({
    collections: { users: collectionName }
  });
  const userInfo: HashedUserInfo = {
    ...defaultUserInfo
  };
  const accessToken = "access token!";
  await connection.db.collection(collectionName).insertOne(userInfo);
  await updateAccessTokenFactory(getConfig, userInfo, accessToken)(
    connection.db
  );
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual({ ...userInfo, accessToken });
  done();
});

it("should not update access token if user info is incorrect", async done => {
  const collectionName = "token2";
  const getConfig = jest.fn().mockReturnValue({
    collections: { users: collectionName }
  });
  const userInfo = {
    ...defaultUserInfo
  };
  const accessToken = "access token!";
  await connection.db.collection(collectionName).insertOne(userInfo);
  await updateAccessTokenFactory(
    getConfig,
    { ...defaultUserInfo, email: "random@gmail.com" },
    accessToken
  )(connection.db);
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(userInfo);
  done();
});

it("should update existent access token", async done => {
  const collectionName = "token3";
  const getConfig = jest.fn().mockReturnValue({
    collections: { users: collectionName }
  });
  const userInfo = {
    ...defaultUserInfo
  };
  const accessToken = "access token!";
  await connection.db.collection(collectionName).insertOne(userInfo);
  await updateAccessTokenFactory(getConfig, userInfo, accessToken)(
    connection.db
  );
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual({ ...userInfo, accessToken });
  done();
});
