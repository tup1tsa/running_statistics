import { Query } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { GetConfig } from "../../config";
import { UserInfo } from "./saveNewUser";

type UpdateAccessToken = (
  getConfig: GetConfig,
  userInfo: UserInfo,
  token: string
) => Query<UpdateWriteOpResult>;

export const updateAccessToken: UpdateAccessToken = (
  getConfig,
  userInfo,
  token
) => async db => {
  const collection = db.collection(getConfig().collections.users);
  return collection.updateOne(
    {
      email: userInfo.email,
      passwordHash: userInfo.passwordHash
    },
    { $set: { accessToken: token } }
  );
};
