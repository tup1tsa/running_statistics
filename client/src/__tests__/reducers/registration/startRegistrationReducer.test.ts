import {
  startRegistration,
  stopGps
} from "../../../application/actions/actionCreators";
import { startRegistrationReducer } from "../../../application/reducers/registration/startRegistrationReducer";

const defaultState = {
  registrationInProgress: false,
  registrationError: null
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(startRegistrationReducer(defaultState, action)).toEqual(defaultState);
});

it("should toggle registration on", () => {
  const action = startRegistration();
  expect(startRegistrationReducer(defaultState, action)).toEqual({
    registrationError: null,
    registrationInProgress: true
  });
});

it("should remove  old registration error", () => {
  const action = startRegistration();
  expect(
    startRegistrationReducer(
      { ...defaultState, registrationError: "old error" },
      action
    )
  ).toEqual({
    registrationInProgress: true,
    registrationError: null
  });
});
