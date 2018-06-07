import { LocalStorage, Race } from '../common_files/interfaces';

export const saveRace = (
  race: Race,
  storage: LocalStorage,
  fetchRacesFromStorageFactory: () => Race[]
) => {
  const savedRaces = fetchRacesFromStorageFactory();
  const allRaces = savedRaces.concat([race]);
  storage.setItem('races', JSON.stringify(allRaces));
};