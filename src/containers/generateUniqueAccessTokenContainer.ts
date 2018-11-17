import { createSalt } from "../application/createSalt";
import { generateUniqueAccessToken } from "../application/generateUniqueAccessToken";
import { isAccessTokenUniqueContainer } from "./database/queries/isAccessTokenUniqueContainer";

export type GenerateUniqueAccessTokenContainer = () => Promise<string>;

export const generateUniqueAccessTokenContainer: GenerateUniqueAccessTokenContainer = () =>
  generateUniqueAccessToken(createSalt, isAccessTokenUniqueContainer);
