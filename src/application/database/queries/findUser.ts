import { Query, runQueryContainer } from "mongo-wrappers";
import { TotalUserInfo } from "running_app_core";
import { GetConfig, getConfig } from "../../config";

interface FilterQuery {
  readonly email?: string;
  readonly accessToken?: string;
  readonly emailVerificationLink?: string;
  readonly passwordResetLink?: string;
}

interface MongoQuery {
  $and: FilterQuery[];
}

export type FindUser = (
  filterQuery: FilterQuery
) => Promise<TotalUserInfo | null>;
type FindUserFactory = (
  getConfig: GetConfig,
  filterQuery: FilterQuery
) => Query<TotalUserInfo | null>;

export const findUserFactory: FindUserFactory = (
  getConfigFunc,
  filterQuery
) => async db => {
  const collection = db.collection(getConfigFunc().collections.users);
  const mongoQuery: MongoQuery = {
    $and: []
  };
  if (filterQuery.email) {
    mongoQuery.$and.push({ email: filterQuery.email });
  }
  if (filterQuery.accessToken) {
    mongoQuery.$and.push({ accessToken: filterQuery.accessToken });
  }
  if (filterQuery.emailVerificationLink) {
    mongoQuery.$and.push({
      emailVerificationLink: filterQuery.emailVerificationLink
    });
  }
  if (filterQuery.passwordResetLink) {
    mongoQuery.$and.push({ passwordResetLink: filterQuery.passwordResetLink });
  }
  const result = (await collection
    .find(mongoQuery, { limit: 1 })
    .toArray()) as TotalUserInfo[];
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const findUser: FindUser = filterQuery =>
  runQueryContainer(findUserFactory(getConfig, filterQuery));
