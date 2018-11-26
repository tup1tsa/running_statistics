import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<
  GlobalState,
  | "isLogged"
  | "registrationInProgress"
  | "passwordFirstInput"
  | "passwordSecondInput"
>;

type SuccessRegistrationReducer = (state: State, action: AnyAction) => State;

export const successRegistrationReducer: SuccessRegistrationReducer = (
  state,
  action
) => {
  if (action.type !== "SUCCESS_REGISTRATION") {
    return state;
  }
  return {
    ...state,
    registrationInProgress: false,
    passwordFirstInput: "",
    passwordSecondInput: "",
    isLogged: true
  };
};
