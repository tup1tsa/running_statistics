import { Query } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { Config } from "../../config";
import { UserInfo } from "./saveNewUser";

type UpdateAccessToken = (
  config: Config,
  userInfo: UserInfo,
  token: string
) => Query<UpdateWriteOpResult>;

export const updateAccessToken: UpdateAccessToken = (
  config,
  userInfo,
  token
) => async db => {
  const collection = db.collection(config.collections.users);
  return collection.updateOne(
    {
      email: userInfo.email,
      passwordHash: userInfo.passwordHash
    },
    { $set: { accessToken: token } }
  );
};
