import { PositionResponse } from "../components/Path/PathWatcher";

export type RaceType = "walking" | "running" | "cycling";
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
  readonly payload: PositionResponse;
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

export interface SavingErrorAction {
  readonly type: "SAVING_ERROR";
  readonly error: true;
  readonly payload: Error;
}

export interface ShowSavingMessageAction {
  readonly type: "SHOW_SAVING_MESSAGE";
  readonly payload: string;
}

export type AnyAction =
  | StartRaceAction
  | ToggleSavingAction
  | AddGpsPositionAction
  | GpsErrorAction
  | SavingErrorAction
  | ShowSavingMessageAction
  | StopGpsAction;
