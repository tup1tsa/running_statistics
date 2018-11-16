import { generateAccessToken } from "../application/generateAccessToken";
import { generateUniqueAccessToken } from "../application/generateUniqueAccessToken";
import { isAccessTokenUniqueContainer } from "./database/queries/isAccessTokenUniqueContainer";

export type GenerateUniqueAccessTokenContainer = () => Promise<string>;

export const generateUniqueAccessTokenContainer: GenerateUniqueAccessTokenContainer = () =>
  generateUniqueAccessToken(generateAccessToken, isAccessTokenUniqueContainer);
