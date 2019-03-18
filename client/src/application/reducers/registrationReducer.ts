import { Reducer } from "redux";
import { AnyAction } from "../actions/actions";

export interface RegistrationState {
  readonly passwordFirstInput: string;
  readonly passwordSecondInput: string;
  readonly inProgress: boolean;
  readonly error: string | null;
}

const defaultState: RegistrationState = {
  passwordFirstInput: "",
  passwordSecondInput: "",
  inProgress: false,
  error: null
};

const registrationReducer: Reducer<RegistrationState, AnyAction> = (
  state = defaultState,
  action
) => {
  if (action.type === "CHANGE_REGISTRATION_PASSWORD") {
    return { ...state, passwordFirstInput: action.payload };
  }
  if (action.type === "CHANGE_REGISTRATION_PASSWORD_CONFIRMATION") {
    return { ...state, passwordSecondInput: action.payload };
  }
  if (action.type === "REGISTRATION_FAIL") {
    return {
      ...state,
      passwordFirstInput: "",
      passwordSecondInput: "",
      inProgress: false,
      error: action.payload.message
    };
  }
  if (action.type === "REGISTRATION_START") {
    return {
      ...state,
      inProgress: true,
      error: null
    };
  }
  if (action.type === "REGISTRATION_SUCCESS") {
    return {
      ...state,
      inProgress: false,
      passwordFirstInput: "",
      passwordSecondInput: ""
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      passwordFirstInput: "",
      passwordSecondInput: ""
    };
  }
  return state;
};

export default registrationReducer;
