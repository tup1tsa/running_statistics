import { Race } from "running_app_core";
import { User } from "../reducers/userReducer";
import {
  AddGpsPositionAction,
  ChangeRaceTypeAction,
  DecrementRaceAction,
  GpsErrorAction,
  IncrementRaceAction,
  LoginFailAction,
  LoginStartAction,
  LoginSuccessAction,
  LogoutAction,
  RaceType,
  RemoveErrorsAction,
  SetRacesAction,
  StartRaceAction,
  StartRacePayload,
  StartRacesDownloadAction,
  StopGpsAction,
  ToggleSavingAction
} from "./actions";

type ToggleSaving = () => ToggleSavingAction;
export const toggleSaving: ToggleSaving = () => ({ type: "TOGGLE_SAVING" });

type AddGpsPosition = (position: Position) => AddGpsPositionAction;
export const addGpsPosition: AddGpsPosition = position => ({
  type: "ADD_GPS_POSITION",
  payload: {
    timestamp: position.timestamp,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      accuracy: position.coords.accuracy,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed
    }
  }
});

type GpsError = (error: PositionError) => GpsErrorAction;
export const gpsError: GpsError = error => ({
  type: "GPS_ERROR",
  error: true,
  payload: error
});

type StartRace = (payload: StartRacePayload) => StartRaceAction;
export const startRace: StartRace = payload => ({
  type: "START_RACE",
  payload
});

type StopGps = () => StopGpsAction;
export const stopGps: StopGps = () => ({ type: "STOP_GPS" });

type StartRacesDownload = () => StartRacesDownloadAction;
export const startRacesDownload: StartRacesDownload = () => ({
  type: "START_RACES_DOWNLOAD"
});

type SetRaces = (races: ReadonlyArray<Race>) => SetRacesAction;
export const setRaces: SetRaces = races => ({
  type: "SET_RACES",
  payload: races
});

type IncrementRace = () => IncrementRaceAction;
export const incrementRace: IncrementRace = () => ({
  type: "INCREMENT_RACE"
});

type DecrementRace = () => DecrementRaceAction;
export const decrementRace: DecrementRace = () => ({
  type: "DECREMENT_RACE"
});

type ChangeRaceType = (raceType: RaceType) => ChangeRaceTypeAction;
export const changeRaceType: ChangeRaceType = raceType => ({
  type: "CHANGE_RACE_TYPE",
  payload: raceType
});

type LoginStart = () => LoginStartAction;
export const loginStart: LoginStart = () => ({
  type: "LOGIN_START"
});

type LoginSuccess = (payload: User) => LoginSuccessAction;
export const loginSuccess: LoginSuccess = payload => ({
  type: "LOGIN_SUCCESS",
  payload
});

type LoginFail = (error: Error) => LoginFailAction;
export const loginFail: LoginFail = error => ({
  type: "LOGIN_FAIL",
  error: true,
  payload: error
});

type RemoveErrors = () => RemoveErrorsAction;
export const removeErrors: RemoveErrors = () => ({
  type: "REMOVE_ERRORS"
});

type Logout = () => LogoutAction;
export const logout: Logout = () => ({
  type: "LOGOUT"
});
