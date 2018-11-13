import { Race } from "../common_files/interfaces";
import {
  AddGpsPositionAction,
  ChangeRaceTypeAction,
  DecrementRaceAction,
  GpsErrorAction,
  IncrementRaceAction,
  RaceType,
  SetRacesAction,
  StartRaceAction,
  StartRacePayload,
  StartRacesDownloadAction,
  StopGpsAction,
  ToggleSavingAction
} from "./actions";

export type ToggleSaving = () => ToggleSavingAction;
export const toggleSaving: ToggleSaving = () => ({ type: "TOGGLE_SAVING" });

export type AddGpsPosition = (position: Position) => AddGpsPositionAction;
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

export type GpsError = (error: PositionError) => GpsErrorAction;
export const gpsError: GpsError = error => ({
  type: "GPS_ERROR",
  error: true,
  payload: error
});

export type StartRace = (payload: StartRacePayload) => StartRaceAction;
export const startRace: StartRace = payload => ({
  type: "START_RACE",
  payload
});

export type StopGps = () => StopGpsAction;
export const stopGps: StopGps = () => ({ type: "STOP_GPS" });

export type StartRacesDownload = () => StartRacesDownloadAction;
export const startRacesDownload: StartRacesDownload = () => ({
  type: "START_RACES_DOWNLOAD"
});

export type SetRaces = (races: ReadonlyArray<Race>) => SetRacesAction;
export const setRaces: SetRaces = races => ({
  type: "SET_RACES",
  payload: races
});

export type IncrementRace = () => IncrementRaceAction;
export const incrementRace: IncrementRace = () => ({
  type: "INCREMENT_RACE"
});

export type DecrementRace = () => DecrementRaceAction;
export const decrementRace: DecrementRace = () => ({
  type: "DECREMENT_RACE"
});

export type ChangeRaceType = (raceType: RaceType) => ChangeRaceTypeAction;
export const changeRaceType: ChangeRaceType = raceType => ({
  type: "CHANGE_RACE_TYPE",
  payload: raceType
});
