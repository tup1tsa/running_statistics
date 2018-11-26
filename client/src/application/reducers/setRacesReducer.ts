import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "racesAreBeingDownloaded" | "downloadedRaces">;

type SetRacesReducer = (state: State, action: AnyAction) => State;

export const setRacesReducer: SetRacesReducer = (state, action) => {
  if (action.type !== "SET_RACES") {
    return state;
  }
  return {
    racesAreBeingDownloaded: false,
    downloadedRaces: action.payload
  };
};
