import { InsertOneWriteOpResult } from "mongodb";
import { Query } from "../databaseWrappers";

export interface UserInfo {
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
}

type SaveNewUser = (
  collectionName: string,
  userInfo: UserInfo
) => Query<InsertOneWriteOpResult>;

export const saveNewUser: SaveNewUser = (
  collectionName,
  userInfo
) => async db => db.collection(collectionName).insertOne(userInfo);
