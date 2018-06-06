import {
  clearRacesFromStorage,
  fetchRacesFromStorage,
  saveRaceToStorage,
  LocalStorage,
} from './storageUtils';
import { validatePath } from '../common_files/validatePath';
import { Race } from '../common_files/interfaces';

declare var localStorage: LocalStorage;

export const clearRacesFromStorageFactory = () => clearRacesFromStorage(localStorage);
export const fetchRacesFromStorageFactory = () => fetchRacesFromStorage(localStorage, validatePath);
export const saveRaceToStorageFactory = (path: Race) =>
  saveRaceToStorage(path, localStorage, fetchRacesFromStorageFactory);