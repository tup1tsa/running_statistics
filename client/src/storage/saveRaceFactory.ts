import { LocalStorage, Race } from '../common_files/interfaces';
import { saveRace } from './saveRace';
import { fetchRacesFactory } from './fetchRacesFactory';

declare var localStorage: LocalStorage;

export const saveRaceFactory = (path: Race) =>
  saveRace(path, localStorage, fetchRacesFactory);