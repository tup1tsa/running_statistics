import { Race } from "./common_files/interfaces";

export const finishRace = async (
  race: Race,
  saveRaceToStorage: (race: Race) => void,
  fetchRacesFromStorage: () => ReadonlyArray<Race>,
  deleteRacesFromStorage: () => void,
  // tslint:disable-next-line no-any
  validatePath: (path: any) => boolean,
  sendRacesToServer: (races: ReadonlyArray<Race>) => Promise<boolean>
): Promise<string> => {
  saveRaceToStorage(race);
  const races = fetchRacesFromStorage().filter(currentRace =>
    validatePath(currentRace.path)
  );
  if (races.length === 0) {
    deleteRacesFromStorage();
    return "There is nothing to save";
  }
  const result = await sendRacesToServer(races);
  if (!result) {
    return "Saving was unsuccessful";
  }
  deleteRacesFromStorage();
  return "Races were successfully saved";
};
