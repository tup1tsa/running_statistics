import { LocalStorage, Race } from "../common_files/interfaces";

export type ValidatePath = (path: any) => boolean;

type FetchRaces = (
  storage: LocalStorage,
  validatePath: ValidatePath
) => ReadonlyArray<Race>;

export const fetchRaces: FetchRaces = (storage, validatePath) => {
  const races = storage.getItem("races");
  if (races === null) {
    return [];
  }
  let parsedRaces;
  try {
    parsedRaces = JSON.parse(races);
  } catch (e) {
    return [];
  }
  if (!Array.isArray(parsedRaces)) {
    return [];
  }
  return parsedRaces.filter(race => validatePath(race.path));
};
