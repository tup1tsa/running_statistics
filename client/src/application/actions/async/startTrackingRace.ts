import { Dispatch } from "redux";
import {
  GeoLocation,
  PositionResponse
} from "../../components/Path/PathWatcher";
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
  const successCallback = (position: PositionResponse) =>
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
