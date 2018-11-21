import { AnyAction } from "../actions/actions";

interface State {
  registrationError: string | null;
  registrationInProgress: boolean;
  passwordFirstInput: string;
  passwordSecondInput: string;
}

type FailRegistrationReducer = (state: State, action: AnyAction) => State;

export const failRegistationReducer: FailRegistrationReducer = (
  state,
  action
) => {
  if (action.type !== "FAIL_REGISTRATION") {
    return state;
  }
  return {
    ...state,
    registrationInProgress: false,
    registrationError: action.payload.message,
    passwordFirstInput: "",
    passwordSecondInput: ""
  };
};
