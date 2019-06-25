import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface User {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly emailVerified: boolean;
  readonly photoURL: string | null;
  readonly uid: string;
}

export interface UserState extends User {
  readonly isLoggedIn: boolean;
}

const defaultState: UserState = {
  displayName: null,
  email: null,
  emailVerified: false,
  photoURL: null,
  uid: "",
  isLoggedIn: false
};

const userReducer: Reducer<UserState, AnyAction> = (
  state = defaultState,
  action
) => {
  if (action.type === "LOGIN_SUCCESS") {
    return { ...state, ...action.payload, isLoggedIn: true };
  }
  if (action.type === "LOGOUT") {
    return defaultState;
  }
  return state;
};

export default userReducer;
