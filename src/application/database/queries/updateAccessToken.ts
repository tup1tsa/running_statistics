import { Query, runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { HashedUserInfo } from "running_app_core";
import { GetConfig, getConfig } from "../../config";

type UpdateAccessTokenFactory = (
  getConfig: GetConfig,
  userInfo: HashedUserInfo,
  token: string
) => Query<UpdateWriteOpResult>;
type UpdateAccessToken = (
  userInfo: HashedUserInfo,
  token: string
) => Promise<UpdateWriteOpResult>;

export const updateAccessTokenFactory: UpdateAccessTokenFactory = (
  getConfigFunc,
  userInfo,
  token
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  return collection.updateOne(
    {
      email: userInfo.email,
      passwordHash: userInfo.passwordHash
    },
    { $set: { accessToken: token } }
  );
};

export const updateAccessToken: UpdateAccessToken = (userInfo, token) =>
  runQueryContainer(updateAccessTokenFactory(getConfig, userInfo, token));
