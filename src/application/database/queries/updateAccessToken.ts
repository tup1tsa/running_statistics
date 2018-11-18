import { Query, runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { GetConfig, getConfig } from "../../config";
import { UserInfoHashed } from "./saveNewUser";

type UpdateAccessTokenFactory = (
  getConfig: GetConfig,
  userInfo: UserInfoHashed,
  token: string
) => Query<UpdateWriteOpResult>;
type UpdateAccessToken = (
  userInfo: UserInfoHashed,
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
