import { AnyAction } from "../../actions/actions";
import { GlobalState } from "../rootReducer";

type State = Pick<
  GlobalState,
  "login" | "email" | "passwordFirstInput" | "passwordSecondInput"
>;

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
  if (action.payload.fieldName === "password") {
    return { ...state, passwordFirstInput: action.payload.value };
  }
  return { ...state, passwordSecondInput: action.payload.value };
};
