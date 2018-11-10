import { LocationChangeAction } from "connected-react-router";
import { Race } from "../common_files/interfaces";

export type RaceType = "walking" | "running" | "cycling" | "driving";
export interface StartRacePayload {
  readonly raceType: RaceType;
  readonly gpsId: number;
}
export interface StartRaceAction {
  readonly type: "START_RACE";
  readonly payload: StartRacePayload;
}

export interface AddGpsPositionAction {
  readonly type: "ADD_GPS_POSITION";
  readonly payload: Position;
}

export interface GpsErrorAction {
  readonly type: "GPS_ERROR";
  readonly error: true;
  readonly payload: PositionError;
}

export interface ToggleSavingAction {
  readonly type: "TOGGLE_SAVING";
}

export interface StopGpsAction {
  readonly type: "STOP_GPS";
}

export interface StartRacesDownloadAction {
  readonly type: "START_RACES_DOWNLOAD";
}

export interface SetRacesAction {
  readonly type: "SET_RACES";
  readonly payload: ReadonlyArray<Race>;
}

export interface IncrementRaceAction {
  readonly type: "INCREMENT_RACE";
}

export interface DecrementRaceAction {
  readonly type: "DECREMENT_RACE";
}

export type AnyAction =
  | LocationChangeAction
  | StartRaceAction
  | ToggleSavingAction
  | AddGpsPositionAction
  | GpsErrorAction
  | StopGpsAction
  | StartRacesDownloadAction
  | SetRacesAction
  | IncrementRaceAction
  | DecrementRaceAction;
