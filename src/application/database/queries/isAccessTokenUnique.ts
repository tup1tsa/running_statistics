import { Query } from "mongo-wrappers";
import { GetConfig } from "../../config";

export type IsAccessTokenUnique = (
  getConfig: GetConfig,
  token: string
) => Query<boolean>;

export const isAccessTokenUnique: IsAccessTokenUnique = (
  getConfig,
  token
) => async db => {
  const collection = db.collection(getConfig().collections.users);
  const result = await collection.findOne({ accessToken: token });
  return result === null;
};
