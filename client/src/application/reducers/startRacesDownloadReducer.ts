import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "racesAreBeingDownloaded">;

type StartRacesDownloadReducer = (state: State, action: AnyAction) => State;

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
