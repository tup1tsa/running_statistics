import { AnyAction } from "../actions/actions";
import { Race } from "../common_files/interfaces";

interface State {
  readonly racesAreBeingDownloaded: boolean;
  readonly downloadedRaces?: ReadonlyArray<Race>;
}

export type SetRacesReducer = (state: State, action: AnyAction) => State;

export const setRacesReducer: SetRacesReducer = (state, action) => {
  if (action.type !== "SET_RACES") {
    return state;
  }
  return {
    racesAreBeingDownloaded: false,
    downloadedRaces: action.payload
  };
};
