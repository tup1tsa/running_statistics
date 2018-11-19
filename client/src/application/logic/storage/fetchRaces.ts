import { LocalStorage, Race } from "../../common_files/interfaces";
import {
  ValidatePath,
  validatePath
} from "../../common_files/validators/validatePath";

export type FetchRaces = () => ReadonlyArray<Race>;
type FetchRacesFactory = (
  storage: LocalStorage,
  validatePath: ValidatePath
) => FetchRaces;

export const fetchRacesFactory: FetchRacesFactory = (
  storage,
  validatePathFunc
) => () => {
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
  return parsedRaces.filter(race => validatePathFunc(race.path));
};

declare var localStorage: LocalStorage;
export const fetchRaces: FetchRaces = fetchRacesFactory(
  localStorage,
  validatePath
);
