import * as crypto from "crypto";
import { TotalUserInfo } from "running_app_core";
import { FindUser, findUser } from "./database/queries/findUser";

export type FindUserByPassword = (
  email: string,
  password: string
) => Promise<TotalUserInfo | null>;
type FindUserByPasswordFactory = (findUser: FindUser) => FindUserByPassword;

export const findUserByPasswordFactory: FindUserByPasswordFactory = findUserFunc => async (
  email,
  password
) => {
  const user = await findUserFunc({ email });
  if (user === null) {
    return null;
  }
  const hash = crypto
    .createHash("sha512")
    .update(user.salt)
    .update(password)
    .digest("hex");
  if (hash !== user.passwordHash) {
    return null;
  }
  return user;
};

export const findUserByPassword: FindUserByPassword = (email, password) =>
  findUserByPasswordFactory(findUser)(email, password);
