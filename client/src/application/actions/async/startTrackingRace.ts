import { Dispatch } from "redux";
import {
  addGpsPosition,
  gpsError,
  startRace,
  stopGps
} from "../actionCreators";
import { RaceType } from "../actions";

export type StartTrackingRace = (
  raceType: RaceType,
  geoLocation: Geolocation
) => (dispatch: Dispatch) => void;

export const startTrackingRace: StartTrackingRace = (
  raceType,
  geoLocation
) => dispatch => {
  const successCallback = (position: Position) =>
    dispatch(addGpsPosition(position));
  const errorCallback = (error: PositionError) => dispatch(gpsError(error));
  const options = {
    enableHighAccuracy: true
  };
  const gpsId = geoLocation.watchPosition(
    successCallback,
    errorCallback,
    options
  );
  dispatch(stopGps());
  dispatch(startRace({ gpsId, raceType }));
};
