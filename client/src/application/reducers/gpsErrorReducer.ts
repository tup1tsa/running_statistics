import { AnyAction } from "../actions/actions";

interface State {
  readonly gpsError: string | null;
}

type GpsErrorReducer = (state: State, action: AnyAction) => State;

export const gpsErrorReducer: GpsErrorReducer = (state, action) => {
  if (action.type !== "GPS_ERROR") {
    return state;
  }
  return { gpsError: action.payload.message };
};
