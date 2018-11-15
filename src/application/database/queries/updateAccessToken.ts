import { Query } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { UserInfo } from "./saveNewUser";

type UpdateAccessToken = (
  collectionName: string,
  userInfo: UserInfo,
  token: string
) => Query<UpdateWriteOpResult>;

export const updateAccessToken: UpdateAccessToken = (
  collectionName,
  userInfo,
  token
) => async db => {
  const collection = db.collection(collectionName);
  return collection.updateOne(
    {
      email: userInfo.email,
      passwordHash: userInfo.passwordHash
    },
    { $set: { accessToken: token } }
  );
};
