import {
  clearPathsFromStorage,
  fetchPathsFromStorage,
  savePathToStorage,
  LocalStorage,
} from './storageUtils';
import { validatePath } from '../common_files/validatePath';
import { PositionInTime } from '../common_files/interfaces';

declare var localStorage: LocalStorage;

export const clearPathsFromStorageFactory = () => clearPathsFromStorage(localStorage);
export const fetchPathsFromStorageFactory = () => fetchPathsFromStorage(localStorage, validatePath);
export const savePathToStorageFactory = (path: PositionInTime[]) =>
  savePathToStorage(path, localStorage, fetchPathsFromStorageFactory);