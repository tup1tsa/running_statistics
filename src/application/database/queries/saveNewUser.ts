import { Query } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { GetConfig } from "../../config";

export interface UserInfo {
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
}

type SaveNewUser = (
  getConfig: GetConfig,
  userInfo: UserInfo
) => Query<InsertOneWriteOpResult>;

export const saveNewUser: SaveNewUser = (getConfig, userInfo) => async db =>
  db.collection(getConfig().collections.users).insertOne(userInfo);
