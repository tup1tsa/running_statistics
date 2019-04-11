import { Reducer } from "redux";
import { Race } from "running_app_core";
import { AnyAction } from "../actions/actions";

export interface RacesOnMapState {
  readonly racesAreBeingDownloaded: boolean;
  readonly downloadedRaces?: ReadonlyArray<Race>;
  readonly currentRaceIndex: number;
  readonly partialRaceStart: number;
  readonly partialRaceFinish: number;
}

const defaultState: RacesOnMapState = {
  racesAreBeingDownloaded: false,
  currentRaceIndex: 0,
  partialRaceStart: 0,
  partialRaceFinish: 100
};

const racesOnMapReducer: Reducer<RacesOnMapState, AnyAction> = (
  state = defaultState,
  action
) => {
  if (action.type === "START_RACES_DOWNLOAD") {
    return { ...state, racesAreBeingDownloaded: true };
  }
  if (action.type === "SET_RACES") {
    return {
      ...state,
      racesAreBeingDownloaded: false,
      downloadedRaces: action.payload
    };
  }
  if (action.type === "INCREMENT_RACE") {
    if (!state.downloadedRaces) {
      return state;
    }
    let nextIndex = state.currentRaceIndex + 1;
    if (nextIndex === state.downloadedRaces.length) {
      nextIndex = 0;
    }
    return {
      ...state,
      currentRaceIndex: nextIndex
    };
  }
  if (action.type === "DECREMENT_RACE") {
    if (!state.downloadedRaces) {
      return state;
    }
    let nextIndex = state.currentRaceIndex - 1;
    if (nextIndex === -1) {
      nextIndex = state.downloadedRaces.length - 1;
    }
    return {
      ...state,
      currentRaceIndex: nextIndex
    };
  }
  return state;
};

export default racesOnMapReducer;
