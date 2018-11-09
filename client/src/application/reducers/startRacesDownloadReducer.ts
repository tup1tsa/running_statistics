import { AnyAction } from "../actions/actions";
import { Race } from "../common_files/interfaces";

export interface StartRacesDownloadReducerState {
  readonly downloadedRaces: ReadonlyArray<Race>;
  readonly racesAreBeingDownloaded: boolean;
}

export type StartRacesDownloadReducer = (
  state: StartRacesDownloadReducerState,
  action: AnyAction
) => StartRacesDownloadReducerState;

export const startRacesDownloadReducer: StartRacesDownloadReducer = (
  state,
  action
) => {
  if (action.type !== "START_RACES_DOWNLOAD") {
    return state;
  }
  return {
    racesAreBeingDownloaded: true,
    downloadedRaces: []
  };
};
