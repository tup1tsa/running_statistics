import { AnyAction } from "../../application/actions/actions";
import {
  stopGpsReducer,
  StopGpsReducerState
} from "../../application/reducers/stopGpsReducer";

export type StopGpsReducerContainer = (
  state: StopGpsReducerState,
  action: AnyAction
) => StopGpsReducerState;

export const stopGpsReducerContainer: StopGpsReducerContainer = (
  state,
  action
) => stopGpsReducer(state, action, navigator.geolocation);
