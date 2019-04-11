import { LocalStorage, Race } from "running_app_core";
import { FetchRaces, fetchRaces } from "./fetchRaces";

export type SaveRace = (race: Race) => void;
type SaveRaceFactory = (
  storage: LocalStorage,
  fetchRaces: FetchRaces
) => SaveRace;

export const saveRaceFactory: SaveRaceFactory = (
  storage,
  fetchRacesFunc
) => race => {
  const savedRaces = fetchRacesFunc();
  const allRaces = savedRaces.concat([race]);
  storage.setItem("races", JSON.stringify(allRaces));
};

declare var localStorage: Storage;
export const saveRace: SaveRace = race =>
  saveRaceFactory(localStorage, fetchRaces)(race);
