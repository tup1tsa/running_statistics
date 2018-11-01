import {
  LocalStorage,
  Race
} from "../../../application/common_files/interfaces";
import { saveRace } from "../../../application/logic/storage/saveRace";
import { fetchRacesContainer } from "./fetchRacesContainer";

declare var localStorage: LocalStorage;

export const saveRaceContainer = (path: Race) =>
  saveRace(path, localStorage, fetchRacesContainer);
