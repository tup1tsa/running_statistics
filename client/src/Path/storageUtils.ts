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
  const runs = storage.getItem('races');
  if (runs === null) {
    return [];
  }
  let parsedRuns;
  try {
    parsedRuns = JSON.parse(runs);
  } catch (e) {
    return [];
  }
  if (!Array.isArray(parsedRuns)) {
    return [];
  }
  return parsedRuns.filter(run => validatePath(run.path));
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