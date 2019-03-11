import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { findUserFactory } from "../../../application/database/queries/findUser";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("findUsersByToken");
  done();
});

afterAll(async done => {
  closeTestDb(connection);
  done();
});

it("should return null if there are no users with specified params", async done => {
  const collectionName = "noUsers";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db
    .collection(collectionName)
    .insertOne({ name: "some name", accessToken: "23" });
  const result = await findUserFactory(getConfig, { accessToken: "34" })(
    connection.db
  );
  expect(result).toBe(null);
  done();
});

it("should find user by token", async done => {
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
  const result = await findUserFactory(getConfig, {
    accessToken: correctUser.accessToken
  })(connection.db);
  expect(result).toEqual(correctUser);
  done();
});

it("should find user by verification link", async done => {
  const collectionName = "verification link search";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const correctUser = {
    name: "correct name",
    accessToken: "correct token",
    emailVerificationLink: "sdf",
    _id: "456"
  };
  await connection.db.collection(collectionName).insertMany([
    {
      name: "some name",
      accessToken: "wrong token",
      _id: "23",
      emailVerificationLink: "666"
    },
    correctUser
  ]);
  const result = await findUserFactory(getConfig, {
    emailVerificationLink: correctUser.emailVerificationLink
  })(connection.db);
  expect(result).toEqual(correctUser);
  done();
});

it("should find user by email", async done => {
  const collectionName = "user email search";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const correctUser = {
    name: "correct name",
    accessToken: "correct token",
    _id: "456",
    email: "fine@gmail.com"
  };
  await connection.db.collection(collectionName).insertMany([
    {
      name: "some name",
      accessToken: "wrong token",
      _id: "23",
      email: "bad@gmail.com"
    },
    correctUser
  ]);
  const result = await findUserFactory(getConfig, {
    email: correctUser.email
  })(connection.db);
  expect(result).toEqual(correctUser);
  done();
});

it("should search by multiple queries at the same time", async done => {
  const collectionName = "multiple filters search";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  const correctUser = {
    name: "correct name",
    accessToken: "correct token",
    _id: "456",
    email: "fine@gmail.com"
  };
  await connection.db.collection(collectionName).insertMany([
    {
      name: "some name",
      accessToken: "wrong token",
      _id: "23",
      email: "bad@gmail.com"
    },
    correctUser
  ]);
  const result = await findUserFactory(getConfig, {
    email: correctUser.email,
    accessToken: correctUser.accessToken
  })(connection.db);
  expect(result).toEqual(correctUser);
  done();
});
