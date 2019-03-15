import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface UserState {
  readonly isLoggedIn: boolean;
  readonly name: string;
  readonly email: string;
}

const defaultState: UserState = {
  isLoggedIn: false,
  name: "",
  email: ""
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
  return state;
};

export default userReducer;
