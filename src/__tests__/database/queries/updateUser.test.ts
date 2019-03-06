import { closeTestDb, Connection, prepareTestDb } from "mongo-wrappers";
import { TotalUserInfo } from "running_app_core";
import { updateUserFactory } from "../../../application/database/queries/updateUser";

let connection: Connection;

beforeAll(async done => {
  connection = await prepareTestDb("updateVerificationLink");
  done();
});

afterAll(async done => {
  await closeTestDb(connection);
  done();
});

const defaultUserInfo: TotalUserInfo = {
  name: "Sasha",
  email: "some@gmail.com",
  passwordHash: "some hasherino",
  salt: "",
  accessToken: "",
  emailVerificationLink: "",
  passwordResetLink: "",
  isEmailVerified: false
};

it("should update user email verification link", async done => {
  const collectionName = "verification_link_success";
  const getConfig = jest.fn().mockReturnValue({
    collections: { users: collectionName }
  });
  const userId = "s23";
  const userInfo: TotalUserInfo = {
    ...defaultUserInfo,
    _id: userId
  };
  const emailVerificationLink = "new_verification_link";
  await connection.db.collection(collectionName).insertOne(userInfo);
  await updateUserFactory(getConfig, userId, { emailVerificationLink })(
    connection.db
  );
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual({ ...userInfo, emailVerificationLink });
  done();
});

it("should update password reset link", async done => {
  const collectionName = "password_reset_link_update";
  const getConfig = jest.fn().mockReturnValue({
    collections: { users: collectionName }
  });
  const userId = "ffa";
  const userInfo: TotalUserInfo = {
    ...defaultUserInfo,
    _id: userId
  };
  const passwordResetLink = "new password link";
  await connection.db.collection(collectionName).insertOne(userInfo);
  await updateUserFactory(getConfig, userId, { passwordResetLink })(
    connection.db
  );
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual({ ...userInfo, passwordResetLink });
  done();
});

it("should not udpate if id is incorrect", async done => {
  const collectionName = "bad_id";
  const getConfig = jest.fn().mockReturnValue({
    collections: { users: collectionName }
  });
  const userInfo: TotalUserInfo = {
    ...defaultUserInfo,
    _id: "ssd"
  };
  const passwordResetLink = "new password link";
  await connection.db.collection(collectionName).insertOne(userInfo);
  await updateUserFactory(getConfig, "ffa", { passwordResetLink })(
    connection.db
  );
  const cursor = await connection.db.collection(collectionName).find();
  const docs = await cursor.toArray();
  expect(docs.length).toBe(1);
  expect(docs[0]).toEqual(userInfo);
  done();
});
