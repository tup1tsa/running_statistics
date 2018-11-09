import { AnyAction } from "../actions/actions";
import { StartRacesDownloadReducerState } from "./startRacesDownloadReducer";

export type SetRacesReducer = (
  state: StartRacesDownloadReducerState,
  action: AnyAction
) => StartRacesDownloadReducerState;

export const setRacesReducer: SetRacesReducer = (state, action) => {
  if (action.type !== "SET_RACES") {
    return state;
  }
  return {
    racesAreBeingDownloaded: false,
    downloadedRaces: action.payload
  };
};
