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

export interface RegistrationStartAction {
  readonly type: "REGISTRATION_START";
}

export interface RegistrationSuccessAction {
  readonly type: "REGISTRATION_SUCCESS";
}

export interface RegistrationFailAction {
  readonly type: "REGISTRATION_FAIL";
  readonly error: true;
  readonly payload: Error;
}

export interface LoginStartAction {
  readonly type: "LOGIN_START";
}

export interface LoginPayload {
  readonly name: string;
  readonly email: string;
  readonly isEmailVerified: boolean;
}
export interface LoginSuccessAction {
  readonly type: "LOGIN_SUCCESS";
  readonly payload: LoginPayload;
}

export interface LoginFailAction {
  readonly type: "LOGIN_FAIL";
  readonly error: true;
  readonly payload: Error;
}

export interface LogoutAction {
  readonly type: "LOGOUT";
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
  | RegistrationStartAction
  | RegistrationFailAction
  | RegistrationSuccessAction
  | LoginStartAction
  | LoginFailAction
  | LogoutAction
  | LoginSuccessAction;
