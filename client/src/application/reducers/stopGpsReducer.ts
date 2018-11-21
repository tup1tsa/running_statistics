import { AnyAction } from "../actions/actions";

interface State {
  readonly gpsId: number;
}

type StopGpsReducer = (state: State, action: AnyAction) => State;
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
