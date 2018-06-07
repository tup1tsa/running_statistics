import { LocalStorage, Race } from '../common_files/interfaces';

export interface ValidatePath {
  // tslint:disable-next-line no-any
  (path: any): boolean;
}

interface FetchRaces {
  (storage: LocalStorage, validatePath: ValidatePath): Race[];
}

export const fetchRaces: FetchRaces = (storage, validatePath) => {
  const races = storage.getItem('races');
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