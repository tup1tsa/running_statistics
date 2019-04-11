import { CreateSalt, createSalt } from "./createSalt";
import { isHashUnique, IsHashUnique } from "./database/queries/isHashUnique";

export type GenerateUniqueHash = () => Promise<string>;
type GenerateUniqueHashFactory = (
  createSalt: CreateSalt,
  isHashUnique: IsHashUnique
) => GenerateUniqueHash;

export const generateUniqueHashFactory: GenerateUniqueHashFactory = (
  createSaltFunc,
  isHashUniqueFunc
) => async () => {
  const hash = createSaltFunc();
  const isUnique = await isHashUniqueFunc(hash);
  if (isUnique) {
    return hash;
  }
  return generateUniqueHashFactory(createSaltFunc, isHashUniqueFunc)();
};

export const generateUniqueHash: GenerateUniqueHash = generateUniqueHashFactory(
  createSalt,
  isHashUnique
);
