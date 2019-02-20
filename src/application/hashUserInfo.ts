import * as crypto from "crypto";
import { RegularRegistrationInfo } from "running_app_core";
import { CreateSalt, createSalt } from "./createSalt";
import { UserInfoHashed } from "./database/queries/saveNewUser";
import {
  GenerateUniqueAccessToken,
  generateUniqueAccessToken
} from "./generateUniqueAccessToken";

export type HashUserInfo = (
  pureUserInfo: RegularRegistrationInfo
) => Promise<UserInfoHashed>;
type HashUserInfoFactory = (
  createSalt: CreateSalt,
  generateUniqueAccessToken: GenerateUniqueAccessToken
) => HashUserInfo;

export const hashUserInfoFactory: HashUserInfoFactory = (
  createSaltFunc,
  generateUniqueAccessTokenFunc
) => async pureUserInfo => {
  const token = await generateUniqueAccessTokenFunc();
  const salt = createSaltFunc();
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

export const hashUserInfo: HashUserInfo = userInfo =>
  hashUserInfoFactory(createSalt, generateUniqueAccessToken)(userInfo);
