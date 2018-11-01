import { Dispatch } from "redux";
import { GeoLocation, PositionResponse } from "../components/Path/PathWatcher";
import {
  AddGpsPositionAction,
  AnyAction,
  ClearGpsIdAction,
  GpsErrorAction,
  RaceType
} from "./actions";

export type StartRace = (
  raceType: RaceType
) => (dispatch: Dispatch<AnyAction>) => void;
export type StartRaceFactory = (geoLocation: GeoLocation) => StartRace;
export const startRaceFactory: StartRaceFactory = geoLocation => raceType => dispatch => {
  const successCallback = (position: PositionResponse) =>
    dispatch({
      type: "ADD_GPS_POSITION",
      payload: position
    });

  const errorCallback = (error: PositionError) =>
    dispatch({
      type: "GPS_ERROR",
      error: true,
      payload: error
    });

  const options = {
    enableHighAccuracy: true
  };

  const gpsId = geoLocation.watchPosition(
    successCallback,
    errorCallback,
    options
  );
  dispatch({
    type: "START_RACE",
    payload: { raceType, gpsId }
  });
};
export const startRace: StartRace = startRaceFactory(navigator.geolocation);

export type ClearGpsId = () => ClearGpsIdAction;
export const clearGpsId: ClearGpsId = () => ({ type: "CLEAR_GPS_ID" });

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
