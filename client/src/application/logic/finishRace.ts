import { SendRacesContainer } from "../../containers/logic/network/sendRacesContainer";
import { DeleteRacesContainer } from "../../containers/logic/storage/deleteRacesContainer";
import { FetchRacesContainer } from "../../containers/logic/storage/fetchRacesContainer";
import { SaveRaceContainer } from "../../containers/logic/storage/saveRaceContainer";
import { Race } from "../common_files/interfaces";
import { ValidatePath } from "./storage/fetchRaces";

export type FinishRace = (
  race: Race,
  saveRaceToStorage: SaveRaceContainer,
  fetchRacesFromStorage: FetchRacesContainer,
  deleteRacesFromStorage: DeleteRacesContainer,
  validatePath: ValidatePath,
  sendRacesToServer: SendRacesContainer
) => Promise<string>;

export const finishRace: FinishRace = async (
  race,
  saveRaceToStorage,
  fetchRacesFromStorage,
  deleteRacesFromStorage,
  validatePath,
  sendRacesToServer
) => {
  saveRaceToStorage(race);
  const races = fetchRacesFromStorage().filter(currentRace =>
    validatePath(currentRace.path)
  );
  if (races.length === 0) {
    deleteRacesFromStorage();
    throw new Error("There is nothing to save");
  }
  const result = await sendRacesToServer(races);
  if (!result) {
    throw new Error("Saving was unsuccessful");
  }
  deleteRacesFromStorage();
  return "Races were successfully saved";
};
