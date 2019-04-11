import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface EmailVerificationState {
  readonly error?: string;
  readonly inProgress: boolean;
}

const defaultState: EmailVerificationState = {
  inProgress: false
};

const emailVerificationReducer: Reducer<EmailVerificationState, AnyAction> = (
  state = defaultState,
  action
) => {
  if (action.type === "EMAIL_VERIFICATON_START") {
    return { ...state, inProgress: true };
  }
  if (action.type === "EMAIL_VERIFICATION_SUCCESS") {
    return { ...state, inProgress: false, error: undefined };
  }
  if (action.type === "EMAIL_VERIFICATION_FAIL") {
    return { ...state, inProgress: false, error: action.payload.message };
  }
  return state;
};

export default emailVerificationReducer;
