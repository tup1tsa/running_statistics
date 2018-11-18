import { Query, runQueryContainer } from "mongo-wrappers";
import { GetConfig, getConfig } from "../../config";
import { UserInfoHashed } from "./saveNewUser";

export type FindUserByEmail = (email: string) => Promise<UserInfoHashed | null>;
type FindUserByEmailFactory = (
  email: string,
  getConfig: GetConfig
) => Query<UserInfoHashed | null>;

export const findUserByEmailFactory: FindUserByEmailFactory = (
  email,
  getConfigFunc
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const result = (await collection
    .find({ email }, { limit: 1 })
    .toArray()) as UserInfoHashed[];
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const findUserByEmail: FindUserByEmail = email =>
  runQueryContainer(findUserByEmailFactory(email, getConfig));
