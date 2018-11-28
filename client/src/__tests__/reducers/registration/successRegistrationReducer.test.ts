import {
  stopGps,
  successRegistration
} from "../../../application/actions/actionCreators";
import { successRegistrationReducer } from "../../../application/reducers/registration/successRegistrationReducer";

const defaultState = {
  registrationInProgress: true,
  passwordFirstInput: "naroma",
  passwordSecondInput: "naroma",
  isLogged: false
};

it("should not change state if action is incorerect", () => {
  const action = stopGps();
  expect(successRegistrationReducer(defaultState, action)).toEqual(
    defaultState
  );
});

it("should turn off registration progress", () => {
  const action = successRegistration();
  expect(
    successRegistrationReducer(defaultState, action).registrationInProgress
  ).toBe(false);
});

it("should clear password inputs", () => {
  const action = successRegistration();
  expect(
    successRegistrationReducer(defaultState, action).passwordFirstInput
  ).toBe("");
  expect(
    successRegistrationReducer(defaultState, action).passwordSecondInput
  ).toBe("");
});

it("should set is logged to true", () => {
  const action = successRegistration();
  expect(successRegistrationReducer(defaultState, action).isLogged).toBe(true);
});
