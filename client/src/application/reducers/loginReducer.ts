import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface LoginState {
  readonly inProgress: boolean;
  readonly isLoggedIn: boolean;
  readonly errorMessage?: string;
}

const defaultState: LoginState = {
  isLoggedIn: false,
  inProgress: false
};

const loginReducer: Reducer<LoginState, AnyAction> = (
  state = defaultState,
  action
) => {
  if (action.type === "LOGIN_START") {
    return { ...state, inProgress: true };
  }
  if (action.type === "LOGIN_FAIL") {
    return {
      ...state,
      inProgress: false,
      errorMessage: action.payload.message
    };
  }
  if (action.type === "LOGIN_SUCCESS") {
    return { ...state, inProgress: false, isLoggedIn: true };
  }
  if (action.type === "LOGOUT") {
    return defaultState;
  }
  return state;
};

export default loginReducer;
