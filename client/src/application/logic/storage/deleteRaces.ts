import { LocalStorage } from "running_app_core";

export type DeleteRaces = () => void;
type DeleteRacesFactory = (storage: LocalStorage) => DeleteRaces;

export const deleteRacesFactory: DeleteRacesFactory = storage => () => {
  storage.setItem("races", JSON.stringify([]));
};

declare var localStorage: LocalStorage;
export const deleteRaces: DeleteRaces = deleteRacesFactory(localStorage);
