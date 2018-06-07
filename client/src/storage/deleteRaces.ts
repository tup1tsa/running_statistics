import { LocalStorage } from '../common_files/interfaces';

export const deleteRaces = (storage: LocalStorage) => {
  storage.setItem('races', JSON.stringify([]));
};