import { runQueryContainer } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { getConfig } from "../../../application/config";
import {
  saveNewUser,
  UserInfoHashed
} from "../../../application/database/queries/saveNewUser";

export type SaveNewUserContainer = (
  userInfo: UserInfoHashed
) => Promise<InsertOneWriteOpResult>;

export const saveNewUserContainer: SaveNewUserContainer = async userInfo =>
  runQueryContainer(saveNewUser(getConfig, userInfo));
