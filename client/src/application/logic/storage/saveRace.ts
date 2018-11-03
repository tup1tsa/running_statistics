import { FetchRacesContainer } from "../../../containers/logic/storage/fetchRacesContainer";
import { LocalStorage, Race } from "../../common_files/interfaces";

export type SaveRace = (
  race: Race,
  storage: LocalStorage,
  fetchRaces: FetchRacesContainer
) => void;

export const saveRace: SaveRace = (race, storage, fetchRaces) => {
  const savedRaces = fetchRaces();
  const allRaces = savedRaces.concat([race]);
  storage.setItem("races", JSON.stringify(allRaces));
};
