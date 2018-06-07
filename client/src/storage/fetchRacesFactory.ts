import { fetchRaces } from './fetchRaces';
import { validatePath } from '../common_files/validatePath';
import { LocalStorage } from '../common_files/interfaces';

declare var localStorage: LocalStorage;

export const fetchRacesFactory = () => fetchRaces(localStorage, validatePath);