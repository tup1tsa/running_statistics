import * as crypto from "crypto";
import { UserInfo } from "../../client/src/application/common_files/interfaces";
import { GenerateUniqueAccessTokenContainer } from "../containers/generateUniqueAccessTokenContainer";
import { CreateSalt } from "./createSalt";
import { UserInfoHashed } from "./database/queries/saveNewUser";

export type HashUserInfo = (
  pureUserInfo: UserInfo,
  createSalt: CreateSalt,
  generateUniqueAccessToken: GenerateUniqueAccessTokenContainer
) => Promise<UserInfoHashed>;

export const hashUserInfo: HashUserInfo = async (
  pureUserInfo,
  createSalt,
  generateUniqueAccessToken
) => {
  const token = await generateUniqueAccessToken();
  const salt = createSalt();
  const passwordHash = crypto
    .createHash("sha512")
    .update(salt)
    .update(pureUserInfo.password)
    .digest("hex");
  return {
    name: pureUserInfo.name,
    email: pureUserInfo.email,
    accessToken: token,
    salt,
    passwordHash
  };
};
