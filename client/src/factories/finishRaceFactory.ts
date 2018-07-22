import { Race } from '../application/common_files/interfaces';
import { finishRace } from '../application/finishRace';
import { saveRaceFactory } from './storage/saveRaceFactory';
import { fetchRacesFactory } from './storage/fetchRacesFactory';
import { deleteRacesFactory } from './storage/deleteRacesFactory';
import { validatePath } from '../application/common_files/validatePath';
import { sendRacesFactory } from './network/sendRacesFactory';

export interface FinishRaceFactory {
  (race: Race): Promise<string>;
}

export const finishRaceFactory: FinishRaceFactory = (race) =>
  finishRace(
    race,
    saveRaceFactory,
    fetchRacesFactory,
    deleteRacesFactory,
    validatePath,
    sendRacesFactory
  );