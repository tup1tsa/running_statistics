import { Query, runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { GetConfig, getConfig } from "../../config";

interface UpdatableInfo {
  readonly emailVerificationLink?: string;
  readonly passwordResetLink?: string;
  readonly isEmailVerified?: boolean;
}

interface UpdateQuery {
  $set: {
    emailVerificationLink?: string;
    passwordResetLink?: string;
    isEmailVerified?: boolean;
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
  { emailVerificationLink, passwordResetLink, isEmailVerified }
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
  if (isEmailVerified) {
    updateQuery.$set.isEmailVerified = isEmailVerified;
  }
  return collection.updateOne({ _id: userId }, updateQuery);
};

export const updateUser: UpdateUser = (userId, link) =>
  runQueryContainer(updateUserFactory(getConfig, userId, link));
