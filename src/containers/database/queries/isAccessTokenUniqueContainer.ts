import { runQueryContainer } from "mongo-wrappers";
import { getConfig } from "../../../application/config";
import { isAccessTokenUnique } from "../../../application/database/queries/isAccessTokenUnique";

export type IsAccessTokenUniqueContainer = (token: string) => Promise<boolean>;

export const isAccessTokenUniqueContainer: IsAccessTokenUniqueContainer = token =>
  runQueryContainer(isAccessTokenUnique(getConfig, token));
