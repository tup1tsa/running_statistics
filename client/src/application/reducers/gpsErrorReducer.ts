import { AnyAction } from "../actions/actions";

interface State {
  gpsError?: string;
}

export type GpsErrorReducer = (state: State, action: AnyAction) => State;

export const gpsErrorReducer: GpsErrorReducer = (state, action) => {
  if (action.type !== "GPS_ERROR") {
    return state;
  }
  return { gpsError: action.payload.message };
};
