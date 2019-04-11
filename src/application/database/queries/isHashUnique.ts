import { Query, runQueryContainer } from "mongo-wrappers";
import { GetConfig, getConfig } from "../../config";

export type IsHashUnique = (hash: string) => Promise<boolean>;
type IsHashUniqueFactory = (
  getConfig: GetConfig,
  hash: string
) => Query<boolean>;

export const isHashUniqueFactory: IsHashUniqueFactory = (
  getConfigFunc,
  hash
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const result = await collection.findOne({
    $or: [
      { accessToken: hash },
      { emailVerificationLink: hash },
      { passwordResetLink: hash }
    ]
  });
  return result === null;
};

export const isHashUnique: IsHashUnique = hash =>
  runQueryContainer(isHashUniqueFactory(getConfig, hash));
