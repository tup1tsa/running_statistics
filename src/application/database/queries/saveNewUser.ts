import { Query, runQueryContainer } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { GetConfig, getConfig } from "../../config";

export interface UserInfoHashed {
  readonly _id?: string;
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly salt: string;
  readonly accessToken: string;
}

type SaveNewUserFactory = (
  getConfig: GetConfig,
  userInfo: UserInfoHashed
) => Query<InsertOneWriteOpResult>;
export type SaveNewUser = (
  userInfo: UserInfoHashed
) => Promise<InsertOneWriteOpResult>;

export const saveNewUserFactory: SaveNewUserFactory = (
  getConfigFunc,
  userInfo
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  await collection.createIndex({ name: 1 }, { unique: true });
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ accessToken: 1 }, { unique: true });
  return collection.insertOne(userInfo);
};

export const SaveNewUser: SaveNewUser = userInfo =>
  runQueryContainer(saveNewUserFactory(getConfig, userInfo));
