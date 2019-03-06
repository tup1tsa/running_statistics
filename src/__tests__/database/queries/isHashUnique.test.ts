import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { TotalUserInfo } from "running_app_core";
import { isHashUniqueFactory } from "../../../application/database/queries/isHashUnique";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("uniqueToken");
  done();
});

afterAll(async done => {
  await closeTestDb(connection);
  done();
});

const users: TotalUserInfo[] = [
  {
    name: "any",
    email: "any@gmail.com",
    passwordHash: "asa",
    accessToken: "ab256",
    emailVerificationLink: "ba45",
    passwordResetLink: "231",
    salt: "",
    isEmailVerified: false
  },
  {
    name: "any",
    email: "any@gmail.com",
    passwordHash: "asa",
    accessToken: "ba45a",
    emailVerificationLink: "458",
    passwordResetLink: "234687",
    salt: "",
    isEmailVerified: false
  },
  {
    name: "any",
    email: "any@gmail.com",
    passwordHash: "asa",
    accessToken: "54579",
    emailVerificationLink: "4214",
    passwordResetLink: "48775",
    salt: "",
    isEmailVerified: false
  },
  {
    name: "any",
    email: "any@gmail.com",
    passwordHash: "asa",
    accessToken: "tgdfg55",
    emailVerificationLink: "fdsf125",
    passwordResetLink: "fdsf877",
    salt: "",
    isEmailVerified: false
  }
];

it("should return true if hash is unique", async done => {
  const collectionName = "uniqueHash";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db.collection(collectionName).insertMany(users);
  const result = await isHashUniqueFactory(getConfig, "ba223")(connection.db);
  expect(result).toBe(true);
  done();
});

it("should return false if hash is used as someone's access token", async done => {
  const collectionName = "nonUniqueToken";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db.collection(collectionName).insertMany(users);
  const result = await isHashUniqueFactory(getConfig, users[3].accessToken)(
    connection.db
  );
  expect(result).toBe(false);
  done();
});

it("should return false if hash is used as someone's reset password link", async done => {
  const collectionName = "nonUniqueReset";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db.collection(collectionName).insertMany(users);
  const result = await isHashUniqueFactory(
    getConfig,
    users[2].passwordResetLink
  )(connection.db);
  expect(result).toBe(false);
  done();
});

it("should return false if hash is used as someone's email verification link", async done => {
  const collectionName = "nonUniqueVerification";
  const getConfig = jest
    .fn()
    .mockReturnValue({ collections: { users: collectionName } });
  await connection.db.collection(collectionName).insertMany(users);
  const result = await isHashUniqueFactory(
    getConfig,
    users[1].emailVerificationLink
  )(connection.db);
  expect(result).toBe(false);
  done();
});
