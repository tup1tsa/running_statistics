import { Query, runQueryContainer } from "mongo-wrappers";
import { GetConfig, getConfig } from "../../config";
import { UserInfoHashed } from "./saveNewUser";

export type FindUserByToken = (token: string) => Promise<UserInfoHashed | null>;
type FindUserByTokenFactory = (
  getConfig: GetConfig,
  token: string
) => Query<UserInfoHashed | null>;

export const findUserByTokenFactory: FindUserByTokenFactory = (
  getConfigFunc,
  token
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const result = (await collection
    .find({ accessToken: token }, { limit: 1 })
    .toArray()) as UserInfoHashed[];
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const findUserByToken: FindUserByToken = token =>
  runQueryContainer(findUserByTokenFactory(getConfig, token));
