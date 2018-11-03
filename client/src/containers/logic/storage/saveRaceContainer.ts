import {
  LocalStorage,
  Race
} from "../../../application/common_files/interfaces";
import { saveRace } from "../../../application/logic/storage/saveRace";
import { fetchRacesContainer } from "./fetchRacesContainer";

declare var localStorage: LocalStorage;

export type SaveRaceContainer = (race: Race) => void;

export const saveRaceContainer: SaveRaceContainer = race =>
  saveRace(race, localStorage, fetchRacesContainer);
