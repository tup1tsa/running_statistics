import { LocalStorage } from "../../../application/common_files/interfaces";
import { deleteRaces } from "../../../application/logic/storage/deleteRaces";

declare var localStorage: LocalStorage;

export type DeleteRacesContainer = () => void;

export const deleteRacesContainer: DeleteRacesContainer = () =>
  deleteRaces(localStorage);
