import { PositionInTime } from './PathWatcher';

export interface LocalStorage {
  getItem(item: string): string | null;
  setItem(item: string, data: string): void;
}

export interface ValidatePath {
  // tslint:disable-next-line no-any
  (path: any): boolean;
}

export const fetchPathsFromStorage = (storage: LocalStorage, validatePath: ValidatePath): PositionInTime[][] => {
  const runs = storage.getItem('runs');
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
  return parsedRuns.filter(run => validatePath(run));
};

export const savePathToStorage = (
  path: PositionInTime[],
  storage: LocalStorage,
  fetchPathFromStorage: () => PositionInTime[][]
) => {
  const localPaths = fetchPathFromStorage();
  const allPaths = localPaths.concat([path]);
  storage.setItem('runs', JSON.stringify(allPaths));
};

export const clearPathsFromStorage = (storage: LocalStorage) => {
  storage.setItem('runs', JSON.stringify([]));
};