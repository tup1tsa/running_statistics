import { AnyAction } from "../actions/actions";

interface State {
  readonly registrationInProgress: boolean;
  readonly registrationError: string | null;
}

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
