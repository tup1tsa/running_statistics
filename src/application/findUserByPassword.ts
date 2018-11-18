import * as crypto from "crypto";
import {
  FindUserByEmail,
  findUserByEmail
} from "./database/queries/findUserByEmail";
import { UserInfoHashed } from "./database/queries/saveNewUser";

type FindUserByPassword = (
  email: string,
  password: string
) => Promise<UserInfoHashed | null>;
type FindUserByPasswordFactory = (
  findUserByEmail: FindUserByEmail
) => FindUserByPassword;

export const findUserByPasswordFactory: FindUserByPasswordFactory = findUserByEmailFunc => async (
  email,
  password
) => {
  const user = await findUserByEmailFunc(email);
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
  findUserByPasswordFactory(findUserByEmail)(email, password);
