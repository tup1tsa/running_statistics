import { IsAccessTokenUniqueContainer } from "../containers/database/queries/isAccessTokenUniqueContainer";
import { CreateSalt } from "./createSalt";

export type GenerateUniqueAccessToken = (
  generateAccessToken: CreateSalt,
  isAccessTokenUnique: IsAccessTokenUniqueContainer
) => Promise<string>;

export const generateUniqueAccessToken: GenerateUniqueAccessToken = async (
  generateAccessToken,
  isAccessTokenUnique
) => {
  const token = generateAccessToken();
  const isUnique = await isAccessTokenUnique(token);
  if (isUnique) {
    return token;
  }
  return generateUniqueAccessToken(generateAccessToken, isAccessTokenUnique);
};
