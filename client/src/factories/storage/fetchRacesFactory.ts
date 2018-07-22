import { fetchRaces } from '../../application/storage/fetchRaces';
import { validatePath } from '../../application/common_files/validatePath';
import { LocalStorage } from '../../application/common_files/interfaces';

declare var localStorage: LocalStorage;

export const fetchRacesFactory = () => fetchRaces(localStorage, validatePath);