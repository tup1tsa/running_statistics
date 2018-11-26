import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<
  GlobalState,
  | "registrationError"
  | "registrationInProgress"
  | "passwordFirstInput"
  | "passwordSecondInput"
>;

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
