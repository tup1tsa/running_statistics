import { Dispatch } from "redux";
import { GeoLocation, Position } from "../../common_files/interfaces";
import { addGpsPosition, gpsError, startRace } from "../actionCreators";
import { RaceType } from "../actions";

export type StartTrackingRace = (
  raceType: RaceType,
  geoLocation: GeoLocation
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
  dispatch(startRace({ gpsId, raceType }));
};
