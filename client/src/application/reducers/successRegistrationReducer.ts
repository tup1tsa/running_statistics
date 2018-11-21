import { AnyAction } from "../actions/actions";

interface State {
  readonly registrationInProgress: boolean;
  readonly passwordFirstInput: string;
  readonly passwordSecondInput: string;
  readonly isLogged: boolean;
}

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
