import { AnyAction } from "../actions/actions";
import { GlobalState } from "./rootReducer";

type State = Pick<
  GlobalState,
  "login" | "email" | "passwordFirstInput" | "passwordSecondInput"
>;

// todo: make sure it changes both password inputs

type ChangeRegistrationFieldReducer = (
  state: State,
  action: AnyAction
) => State;

export const changeRegistrationFieldReducer: ChangeRegistrationFieldReducer = (
  state,
  action
) => {
  if (action.type !== "CHANGE_REGISTRATION_FIELD") {
    return state;
  }
  if (action.payload.fieldName === "login") {
    return { ...state, login: action.payload.value };
  }
  if (action.payload.fieldName === "email") {
    return { ...state, email: action.payload.value };
  }
  return { ...state, password: action.payload.value };
};
