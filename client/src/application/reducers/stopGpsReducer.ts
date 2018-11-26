import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "gpsId">;

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
