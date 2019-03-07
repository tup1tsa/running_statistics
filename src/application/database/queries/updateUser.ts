import { Query, runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { GetConfig, getConfig } from "../../config";

interface UpdatableInfo {
  readonly emailVerificationLink?: string;
  readonly passwordResetLink?: string;
  readonly isEmailVerified?: boolean;
}

interface FilterInfo {
  readonly emailVerificationLink?: string;
  readonly _id?: string;
}

interface UpdateQuery {
  readonly $set: {
    emailVerificationLink?: string;
    passwordResetLink?: string;
    isEmailVerified?: boolean;
  };
}

interface SearchFilter {
  readonly $or: object[];
}

type UpdateUserFactory = (
  getConfig: GetConfig,
  filterInfo: FilterInfo,
  updateInfo: UpdatableInfo
) => Query<UpdateWriteOpResult>;
export type UpdateUser = (
  filterInfo: FilterInfo,
  updateInfo: UpdatableInfo
) => Promise<UpdateWriteOpResult>;

export const updateUserFactory: UpdateUserFactory = (
  getConfigFunc,
  filterInfo,
  { emailVerificationLink, passwordResetLink, isEmailVerified }
) => db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const filter: SearchFilter = { $or: [] };
  if (filterInfo._id) {
    filter.$or.push({ _id: filterInfo._id });
  }
  if (filterInfo.emailVerificationLink) {
    filter.$or.push({
      emailVerificationLink: filterInfo.emailVerificationLink
    });
  }
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
  return collection.updateOne(filter, updateQuery);
};

export const updateUser: UpdateUser = (filterInfo, link) =>
  runQueryContainer(updateUserFactory(getConfig, filterInfo, link));
