import { LocationChangeAction } from "connected-react-router";
import { Race } from "running_app_core";

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

export interface ChangeRaceTypeAction {
  readonly type: "CHANGE_RACE_TYPE";
  readonly payload: RaceType;
}

export interface ChangeRegistrationNameAction {
  readonly type: "CHANGE_REGISTRATION_NAME";
  readonly payload: string;
}

export interface ChangeRegistrationEmailAction {
  readonly type: "CHANGE_REGISTRATION_EMAIL";
  readonly payload: string;
}

export interface ChangeRegistrationPasswordAction {
  readonly type: "CHANGE_REGISTRATION_PASSWORD";
  readonly payload: string;
}

export interface ChangeRegistrationPasswordConfirmationAction {
  readonly type: "CHANGE_REGISTRATION_PASSWORD_CONFIRMATION";
  readonly payload: string;
}

export interface StartRegistrationAction {
  readonly type: "START_REGISTRATION";
}

export interface SuccessRegistrationAction {
  readonly type: "SUCCESS_REGISTRATION";
}

export interface FailRegistrationAction {
  readonly type: "FAIL_REGISTRATION";
  readonly error: true;
  readonly payload: Error;
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
  | DecrementRaceAction
  | ChangeRaceTypeAction
  | ChangeRegistrationEmailAction
  | ChangeRegistrationNameAction
  | ChangeRegistrationPasswordAction
  | ChangeRegistrationPasswordConfirmationAction
  | StartRegistrationAction
  | FailRegistrationAction
  | SuccessRegistrationAction;
