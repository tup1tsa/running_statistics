import { deleteRaces } from '../../application/storage/deleteRaces';
import { LocalStorage } from '../../application/common_files/interfaces';

declare var localStorage: LocalStorage;

export interface DeleteRacesFactory {
  (): void;
}

export const deleteRacesFactory: DeleteRacesFactory = () => deleteRaces(localStorage);