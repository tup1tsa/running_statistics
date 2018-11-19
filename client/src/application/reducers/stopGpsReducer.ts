import { AnyAction } from "../actions/actions";

export interface StopGpsReducerState {
  readonly gpsId: number;
}

export type StopGpsReducer = (
  state: StopGpsReducerState,
  action: AnyAction
) => StopGpsReducerState;
type StopGpsReducerFactory = (geoLocation: Geolocation) => StopGpsReducer;

export const stopGpsReducerFactory: StopGpsReducerFactory = geoLocation => (
  state,
  action
) => {
  if (action.type !== "STOP_GPS") {
    return state;
  }
  geoLocation.clearWatch(state.gpsId);
  return { ...state, gpsId: 0 };
};

export const stopGpsReducer: StopGpsReducer = stopGpsReducerFactory(
  navigator.geolocation
);
