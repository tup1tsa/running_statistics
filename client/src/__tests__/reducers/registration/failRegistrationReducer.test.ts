import {
  failRegistration,
  stopGps
} from "../../../application/actions/actionCreators";
import { failRegistationReducer } from "../../../application/reducers/registration/failRegistrationReducer";

const defaultState = {
  registrationError: null,
  registrationInProgress: true,
  passwordFirstInput: "baka",
  passwordSecondInput: "ayaya"
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(failRegistationReducer(defaultState, action)).toEqual(defaultState);
});

it("should stop gps and set registration error message", () => {
  const error = new Error("bad weather");
  const action = failRegistration(error);
  const nextAction = failRegistationReducer(defaultState, action);
  expect(nextAction.registrationError).toBe("bad weather");
  expect(nextAction.registrationInProgress).toBe(false);
});

it("should clear password fields", () => {
  const action = failRegistration(new Error("some internet error"));
  expect(failRegistationReducer(defaultState, action).passwordFirstInput).toBe(
    ""
  );
  expect(failRegistationReducer(defaultState, action).passwordSecondInput).toBe(
    ""
  );
});
