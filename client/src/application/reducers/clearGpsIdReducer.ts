import { GeoLocationMock } from "../../__mocks__/GeoLocation";
import { AnyAction } from "../actions/actions";

interface State {
  readonly raceInProgress: boolean;
  readonly gpsId: number;
}

export type ClearGpsIdReducer = (
  state: State,
  action: AnyAction,
  geoLocation: GeoLocationMock
) => State;

export const clearGpsIdReducer: ClearGpsIdReducer = (
  state,
  action,
  geoLocation
) => {
  if (action.type !== "CLEAR_GPS_ID") {
    return state;
  }
  geoLocation.clearWatch(state.gpsId);
  return {
    raceInProgress: false,
    gpsId: 0
  };
};
