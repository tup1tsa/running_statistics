import { AnyAction } from "../actions/actions";

export interface StartRacesDownloadReducerState {
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
    racesAreBeingDownloaded: true
  };
};
