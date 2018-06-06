import { Race } from '../common_files/interfaces';

export interface LocalStorage {
  getItem(item: string): string | null;
  setItem(item: string, data: string): void;
}

export interface ValidatePath {
  // tslint:disable-next-line no-any
  (path: any): boolean;
}

interface FetchRacesFromStorage {
  (storage: LocalStorage, validatePath: ValidatePath): Race[];
}

export const fetchRacesFromStorage: FetchRacesFromStorage = (storage, validatePath) => {
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

export const saveRaceToStorage = (
  race: Race,
  storage: LocalStorage,
  fetchRacesFromStorageFactory: () => Race[]
) => {
  const localPaths = fetchRacesFromStorageFactory();
  const allPaths = localPaths.concat([race]);
  storage.setItem('races', JSON.stringify(allPaths));
};

export const clearRacesFromStorage = (storage: LocalStorage) => {
  storage.setItem('races', JSON.stringify([]));
};