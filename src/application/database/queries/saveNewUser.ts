import { Query } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { GetConfig } from "../../config";

export interface UserInfoHashed {
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly salt: string;
  readonly accessToken: string;
}

type SaveNewUser = (
  getConfig: GetConfig,
  userInfo: UserInfoHashed
) => Query<InsertOneWriteOpResult>;

export const saveNewUser: SaveNewUser = (getConfig, userInfo) => async db => {
  const collection = db.collection(getConfig().collections.users);
  await collection.createIndex({ name: 1 }, { unique: true });
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ accessToken: 1 }, { unique: true });
  return collection.insertOne(userInfo);
};
