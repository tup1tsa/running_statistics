import { CreateSalt, createSalt } from "./createSalt";
import {
  isAccessTokenUnique,
  IsAccessTokenUnique
} from "./database/queries/isAccessTokenUnique";

export type GenerateUniqueAccessToken = () => Promise<string>;
type GenerateUniqueAccessTokenFactory = (
  generateAccessToken: CreateSalt,
  isAccessTokenUnique: IsAccessTokenUnique
) => GenerateUniqueAccessToken;

export const generateUniqueAccessTokenFactory: GenerateUniqueAccessTokenFactory = (
  generateAccessToken,
  isAccessTokenUniqueFunc
) => async () => {
  const token = generateAccessToken();
  const isUnique = await isAccessTokenUniqueFunc(token);
  if (isUnique) {
    return token;
  }
  return generateUniqueAccessTokenFactory(
    generateAccessToken,
    isAccessTokenUniqueFunc
  )();
};

export const generateUniqueAccessToken: GenerateUniqueAccessToken = generateUniqueAccessTokenFactory(
  createSalt,
  isAccessTokenUnique
);
