import { LocalStorage } from "../../application/common_files/interfaces";
import { deleteRaces } from "../../application/storage/deleteRaces";

declare var localStorage: LocalStorage;

export type DeleteRacesFactory = () => void;

export const deleteRacesFactory: DeleteRacesFactory = () =>
  deleteRaces(localStorage);
