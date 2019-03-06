import { Query, runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { GetConfig, getConfig } from "../../config";

interface UpdatableInfo {
  readonly emailVerificationLink?: string;
  readonly passwordResetLink?: string;
}

interface UpdateQuery {
  $set: {
    emailVerificationLink?: string;
    passwordResetLink?: string;
  };
}

type UpdateUserFactory = (
  getConfig: GetConfig,
  userId: string,
  updateInfo: UpdatableInfo
) => Query<UpdateWriteOpResult>;
export type UpdateUser = (
  userId: string,
  updateInfo: UpdatableInfo
) => Promise<UpdateWriteOpResult>;

export const updateUserFactory: UpdateUserFactory = (
  getConfigFunc,
  userId,
  { emailVerificationLink, passwordResetLink }
) => db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const updateQuery: UpdateQuery = {
    $set: {}
  };
  if (emailVerificationLink) {
    updateQuery.$set.emailVerificationLink = emailVerificationLink;
  }
  if (passwordResetLink) {
    updateQuery.$set.passwordResetLink = passwordResetLink;
  }
  return collection.updateOne({ _id: userId }, updateQuery);
};

export const updateUser: UpdateUser = (userId, link) =>
  runQueryContainer(updateUserFactory(getConfig, userId, link));
