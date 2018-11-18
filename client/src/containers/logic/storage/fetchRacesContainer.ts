import {
  LocalStorage,
  Race
} from "../../../application/common_files/interfaces";
import { validatePath } from "../../../application/common_files/validators/validatePath";
import { fetchRaces } from "../../../application/logic/storage/fetchRaces";

declare var localStorage: LocalStorage;

export type FetchRacesContainer = () => ReadonlyArray<Race>;

export const fetchRacesContainer: FetchRacesContainer = () =>
  fetchRaces(localStorage, validatePath);
