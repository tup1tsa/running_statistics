import { PositionResponse } from "../components/Path/PathWatcher";

export type RaceType = "walking" | "running" | "cycling";

export interface StartRaceAction {
  readonly type: "START_RACE";
  readonly payload: {
    readonly raceType: RaceType;
    readonly gpsId: number;
  };
}

export interface ClearGpsIdAction {
  readonly type: "CLEAR_GPS_ID";
}

export interface AddGpsPositionAction {
  readonly type: "ADD_GPS_POSITION";
  readonly payload: PositionResponse;
}

export interface GpsErrorAction {
  readonly type: "GPS_ERROR";
  readonly error: boolean;
  readonly payload: PositionError;
}

export type AnyAction =
  | StartRaceAction
  | ClearGpsIdAction
  | AddGpsPositionAction
  | GpsErrorAction;
