import * as crypto from "crypto";
import { GenerateUniqueAccessTokenContainer } from "../containers/generateUniqueAccessTokenContainer";
import { CreateSalt } from "./createSalt";
import { UserInfoHashed } from "./database/queries/saveNewUser";

export interface UserInfo {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

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
