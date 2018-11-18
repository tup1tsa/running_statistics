import { Query, runQueryContainer } from "mongo-wrappers";
import { GetConfig, getConfig } from "../../config";

export type IsAccessTokenUnique = (token: string) => Promise<boolean>;
type IsAccessTokenUniqueFactory = (
  getConfig: GetConfig,
  token: string
) => Query<boolean>;

export const isAccessTokenUniqueFactory: IsAccessTokenUniqueFactory = (
  getConfigFunc,
  token
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const result = await collection.findOne({ accessToken: token });
  return result === null;
};

export const isAccessTokenUnique: IsAccessTokenUnique = token =>
  runQueryContainer(isAccessTokenUniqueFactory(getConfig, token));
