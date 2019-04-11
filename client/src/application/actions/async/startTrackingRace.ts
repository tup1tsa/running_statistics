import { push } from "connected-react-router";
import { Dispatch } from "redux";
import {
  addGpsPosition,
  gpsError,
  startRace,
  stopGps
} from "../actionCreators";
import { RaceType } from "../actions";

type StartTrackingRace = (raceType: RaceType) => (dispatch: Dispatch) => void;
type StartTrackingRaceFactory = (geoLocation: Geolocation) => StartTrackingRace;

export const startTrackingRaceFactory: StartTrackingRaceFactory = geoLocation => raceType => dispatch => {
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
  dispatch(push(`/race/${raceType}`));
};

export const startTrackingRace: StartTrackingRace = raceType =>
  startTrackingRaceFactory(navigator.geolocation)(raceType);
