import { AnyAction } from "../actions/actions";
import { GeoLocation } from "../components/Path/PathWatcher";

export interface StopGpsReducerState {
  readonly gpsId: number;
}

export type StopGpsReducer = (
  state: StopGpsReducerState,
  action: AnyAction,
  geoLocation: GeoLocation
) => StopGpsReducerState;

export const stopGpsReducer: StopGpsReducer = (state, action, geoLocation) => {
  if (action.type !== "STOP_GPS") {
    return state;
  }
  geoLocation.clearWatch(state.gpsId);
  return { ...state, gpsId: 0 };
};
