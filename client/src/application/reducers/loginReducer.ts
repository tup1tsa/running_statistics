import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface LoginState {
  readonly email: string;
  readonly password: string;
  readonly inProgress: boolean;
  readonly isLoggedIn: boolean;
  readonly errorMessage?: string;
}

const defaultState: LoginState = {
  email: "",
  password: "",
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
    return {
      ...state,
      inProgress: false,
      isLoggedIn: true,
      email: "",
      password: ""
    };
  }
  if (action.type === "LOGOUT") {
    return defaultState;
  }
  if (action.type === "CHANGE_LOGIN_EMAIL") {
    return { ...state, email: action.payload };
  }
  if (action.type === "CHANGE_LOGIN_PASSWORD") {
    return { ...state, password: action.payload };
  }
  if (action.type === "REMOVE_ERRORS") {
    return { ...state, errorMessage: undefined };
  }
  return state;
};

export default loginReducer;
