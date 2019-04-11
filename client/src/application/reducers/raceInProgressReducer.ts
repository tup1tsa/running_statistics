import { Reducer } from "redux";
import { PositionInTime } from "running_app_core";
import { AnyAction, RaceType } from "../actions/actions";
import {
  ProcessNextPosition,
  processNextPosition
} from "../logic/path/processNextPosition";

export interface RaceInProgressState {
  readonly inProgress: boolean;
  readonly type: RaceType;
  readonly gpsId: number;
  readonly gpsError: string | null;
  readonly positions: ReadonlyArray<PositionInTime>;
  readonly lastTimeCheck: number | null;
  readonly savingInProgress: boolean;
}

type ReducerFactory = (dependencies: {
  readonly processNextPosition: ProcessNextPosition;
  readonly geoLocation: Geolocation;
}) => Reducer<RaceInProgressState, AnyAction>;

const defaultState: RaceInProgressState = {
  gpsError: null,
  inProgress: false,
  lastTimeCheck: null,
  type: "running",
  gpsId: 0,
  positions: [],
  savingInProgress: false
};

export const raceInProgressReducerFactory: ReducerFactory = dependencies => (
  state = defaultState,
  action
) => {
  if (action.type === "ADD_GPS_POSITION") {
    return {
      ...state,
      gpsError: null,
      ...dependencies.processNextPosition(state, action.payload)
    };
  }
  if (action.type === "CHANGE_RACE_TYPE") {
    return { ...state, type: action.payload };
  }
  if (action.type === "GPS_ERROR") {
    return { ...state, gpsError: action.payload.message };
  }
  if (action.type === "START_RACE") {
    return {
      ...state,
      lastTimeCheck: null,
      positions: [],
      gpsId: action.payload.gpsId,
      type: action.payload.raceType,
      inProgress: true,
      gpsError: null
    };
  }
  if (action.type === "TOGGLE_SAVING") {
    return {
      ...state,
      inProgress: false,
      savingInProgress: state.savingInProgress ? false : true
    };
  }
  if (action.type === "STOP_GPS") {
    dependencies.geoLocation.clearWatch(state.gpsId);
    return { ...state, gpsId: 0 };
  }
  return state;
};

export default raceInProgressReducerFactory({
  geoLocation: navigator.geolocation,
  processNextPosition
});
