import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface UserState {
  readonly name: string;
  readonly email: string;
  readonly isEmailVerified: boolean;
}

const defaultState: UserState = {
  name: "",
  email: "",
  isEmailVerified: false
};

const userReducer: Reducer<UserState, AnyAction> = (
  state = defaultState,
  action
) => {
  if (action.type === "CHANGE_REGISTRATION_EMAIL") {
    return { ...state, email: action.payload };
  }
  if (action.type === "CHANGE_REGISTRATION_NAME") {
    return { ...state, name: action.payload };
  }
  if (action.type === "LOGIN_SUCCESS") {
    return { ...state, ...action.payload };
  }
  if (action.type === "LOGOUT") {
    return defaultState;
  }
  return state;
};

export default userReducer;
