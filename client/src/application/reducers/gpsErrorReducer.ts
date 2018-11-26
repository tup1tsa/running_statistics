import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "gpsError">;

type GpsErrorReducer = (state: State, action: AnyAction) => State;

export const gpsErrorReducer: GpsErrorReducer = (state, action) => {
  if (action.type !== "GPS_ERROR") {
    return state;
  }
  return { gpsError: action.payload.message };
};
