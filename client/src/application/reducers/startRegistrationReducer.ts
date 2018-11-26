import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<GlobalState, "registrationInProgress" | "registrationError">;

type StartRegistrationReducer = (state: State, action: AnyAction) => State;

export const startRegistrationReducer: StartRegistrationReducer = (
  state,
  action
) => {
  if (action.type !== "START_REGISTRATION") {
    return state;
  }
  return { ...state, registrationInProgress: true, registrationError: null };
};
