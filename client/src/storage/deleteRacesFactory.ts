import { deleteRaces } from './deleteRaces';
import { LocalStorage } from '../common_files/interfaces';

declare var localStorage: LocalStorage;

export interface DeleteRacesFactory {
  (): void;
}

export const deleteRacesFactory: DeleteRacesFactory = () => deleteRaces(localStorage);