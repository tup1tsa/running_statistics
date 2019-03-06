import { Query, runQueryContainer } from "mongo-wrappers";
import { TotalUserInfo } from "running_app_core";
import { GetConfig, getConfig } from "../../config";

export type FindUserByToken = (token: string) => Promise<TotalUserInfo | null>;
type FindUserByTokenFactory = (
  getConfig: GetConfig,
  token: string
) => Query<TotalUserInfo | null>;

export const findUserByTokenFactory: FindUserByTokenFactory = (
  getConfigFunc,
  token
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const result = (await collection
    .find({ accessToken: token }, { limit: 1 })
    .toArray()) as TotalUserInfo[];
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const findUserByToken: FindUserByToken = token =>
  runQueryContainer(findUserByTokenFactory(getConfig, token));
