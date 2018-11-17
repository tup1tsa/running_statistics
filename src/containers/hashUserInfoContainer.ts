import { UserInfo } from "../../client/src/application/common_files/interfaces";
import { createSalt } from "../application/createSalt";
import { UserInfoHashed } from "../application/database/queries/saveNewUser";
import { hashUserInfo } from "../application/hashUserInfo";
import { generateUniqueAccessTokenContainer } from "./generateUniqueAccessTokenContainer";

export type HashUserInfoContainer = (
  pureUserInfo: UserInfo
) => Promise<UserInfoHashed>;

export const hashUserInfoContainer: HashUserInfoContainer = userInfo =>
  hashUserInfo(userInfo, createSalt, generateUniqueAccessTokenContainer);
