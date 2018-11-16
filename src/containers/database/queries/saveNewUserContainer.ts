import { runQueryContainer } from "mongo-wrappers";
import { InsertOneWriteOpResult } from "mongodb";
import { getConfig } from "../../../application/config";
import {
  saveNewUser,
  UserInfo
} from "../../../application/database/queries/saveNewUser";

type SaveNewUserContainer = (
  userInfo: UserInfo
) => Promise<InsertOneWriteOpResult>;

export const saveNewUserContainer: SaveNewUserContainer = async userInfo =>
  runQueryContainer(saveNewUser(getConfig, userInfo));
