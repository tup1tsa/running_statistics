import { Query, runQueryContainer } from "mongo-wrappers";
import { TotalUserInfo } from "running_app_core";
import { GetConfig, getConfig } from "../../config";

export type FindUserByEmail = (email: string) => Promise<TotalUserInfo | null>;
type FindUserByEmailFactory = (
  email: string,
  getConfig: GetConfig
) => Query<TotalUserInfo | null>;

export const findUserByEmailFactory: FindUserByEmailFactory = (
  email,
  getConfigFunc
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const result = (await collection
    .find({ email }, { limit: 1 })
    .toArray()) as TotalUserInfo[];
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const findUserByEmail: FindUserByEmail = email =>
  runQueryContainer(findUserByEmailFactory(email, getConfig));
