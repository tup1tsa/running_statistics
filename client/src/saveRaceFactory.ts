import { Race } from './common_files/interfaces';
import { saveRace } from './saveRace';
import { saveRaceToStorageFactory } from './Path/storageUtilsFactories';
import { sendRacesToServerFactory } from './Path/sendRacesToServerFactory';

export interface SaveRaceFactory {
  (race: Race): Promise<string>;
}

export const saveRaceFactory: SaveRaceFactory = (race) =>
  saveRace(race, saveRaceToStorageFactory, sendRacesToServerFactory);