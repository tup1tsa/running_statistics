import { Query, runQueryContainer } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { HashedUserInfo } from "running_app_core";
import { GetConfig, getConfig } from "../../config";

type SaveNewUserFactory = (
  getConfig: GetConfig,
  userInfo: HashedUserInfo
) => Query<InsertOneWriteOpResult>;
export type SaveNewUser = (
  userInfo: HashedUserInfo
) => Promise<InsertOneWriteOpResult>;

export const saveNewUserFactory: SaveNewUserFactory = (
  getConfigFunc,
  userInfo
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  await collection.createIndex({ name: 1 }, { unique: true });
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ accessToken: 1 }, { unique: true });
  return collection.insertOne({
    ...userInfo,
    isEmailVerified: false,
    passwordResetLink: "",
    emailVerificationLink: ""
  });
};

export const saveNewUser: SaveNewUser = userInfo =>
  runQueryContainer(saveNewUserFactory(getConfig, userInfo));
