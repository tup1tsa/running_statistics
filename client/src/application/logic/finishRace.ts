import { MESSAGES, Race, ValidatePath, validatePath } from "running_app_core";
import { SendRaces, sendRaces } from "./network/sendRaces";
import { DeleteRaces, deleteRaces } from "./storage/deleteRaces";
import { FetchRaces, fetchRaces } from "./storage/fetchRaces";
import { SaveRace, saveRace } from "./storage/saveRace";

export type FinishRace = (race: Race) => Promise<string>;
type FinishRaceFactory = (
  saveRaceToStorage: SaveRace,
  fetchRacesFromStorage: FetchRaces,
  deleteRacesFromStorage: DeleteRaces,
  validatePath: ValidatePath,
  sendRacesToServer: SendRaces
) => FinishRace;

export const finishRaceFactory: FinishRaceFactory = (
  saveRaceToStorage,
  fetchRacesFromStorage,
  deleteRacesFromStorage,
  validatePathFunc,
  sendRacesToServer
) => async race => {
  saveRaceToStorage(race);
  const races = fetchRacesFromStorage().filter(currentRace =>
    validatePathFunc(currentRace.path)
  );
  if (races.length === 0) {
    deleteRacesFromStorage();
    throw new Error(MESSAGES.nothingToSave);
  }
  const result = await sendRacesToServer(races);
  if (result.errorMessage) {
    throw new Error(result.errorMessage);
  }
  deleteRacesFromStorage();
  return MESSAGES.raceSavedSuccess;
};

export const finishRace: FinishRace = race =>
  finishRaceFactory(saveRace, fetchRaces, deleteRaces, validatePath, sendRaces)(
    race
  );
