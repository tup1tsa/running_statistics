import { PositionResponse } from "../components/Path/PathWatcher";
import {
  AddGpsPositionAction,
  GpsErrorAction,
  SavingErrorAction,
  ShowSavingMessageAction,
  StartRaceAction,
  StartRacePayload,
  StopGpsAction,
  ToggleSavingAction
} from "./actions";

export type ToggleSaving = () => ToggleSavingAction;
export const toggleSaving: ToggleSaving = () => ({ type: "TOGGLE_SAVING" });

export type AddGpsPosition = (
  position: PositionResponse
) => AddGpsPositionAction;
export const addGpsPosition: AddGpsPosition = position => ({
  type: "ADD_GPS_POSITION",
  payload: position
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

export type ShowSavingMessage = (message: string) => ShowSavingMessageAction;
export const showSavingMessage: ShowSavingMessage = message => ({
  type: "SHOW_SAVING_MESSAGE",
  payload: message
});

export type SavingError = (error: Error) => SavingErrorAction;
export const savingError: SavingError = error => ({
  type: "SAVING_ERROR",
  payload: error,
  error: true
});

export type StopGps = () => StopGpsAction;
export const stopGps: StopGps = () => ({ type: "STOP_GPS" });
