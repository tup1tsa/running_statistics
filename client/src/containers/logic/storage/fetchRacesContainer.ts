import { LocalStorage } from "../../../application/common_files/interfaces";
import { validatePath } from "../../../application/common_files/validatePath";
import { fetchRaces } from "../../../application/logic/storage/fetchRaces";

declare var localStorage: LocalStorage;

export const fetchRacesContainer = () => fetchRaces(localStorage, validatePath);
