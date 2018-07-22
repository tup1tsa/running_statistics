import { LocalStorage, Race } from '../../application/common_files/interfaces';
import { saveRace } from '../../application/storage/saveRace';
import { fetchRacesFactory } from './fetchRacesFactory';

declare var localStorage: LocalStorage;

export const saveRaceFactory = (path: Race) =>
  saveRace(path, localStorage, fetchRacesFactory);