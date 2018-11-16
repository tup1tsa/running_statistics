import { Query } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { Config } from "../../config";

export interface UserInfo {
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
}

type SaveNewUser = (
  config: Config,
  userInfo: UserInfo
) => Query<InsertOneWriteOpResult>;

export const saveNewUser: SaveNewUser = (config, userInfo) => async db =>
  db.collection(config.collections.users).insertOne(userInfo);
