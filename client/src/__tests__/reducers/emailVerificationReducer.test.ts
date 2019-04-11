import {
  emailVerificationFail,
  emailVerificationStart,
  emailVerificationSuccess,
  toggleSaving
} from "../../application/actions/actionCreators";
import emailVerificationReducer from "../../application/reducers/emailVerificationReducer";

const defaultState = {
  inProgress: false
};

it("should not change anything if action is not correct", () => {
  expect(emailVerificationReducer(defaultState, toggleSaving())).toEqual(
    defaultState
  );
});

it("should toggle in progress on start", () => {
  const action = emailVerificationStart();
  expect(
    emailVerificationReducer({ ...defaultState, inProgress: false }, action)
  ).toEqual({ ...defaultState, inProgress: true });
});

it("should remove error and toggle off in progress on success", () => {
  const state = {
    ...defaultState,
    inProgress: true,
    error: "some error"
  };
  expect(emailVerificationReducer(state, emailVerificationSuccess())).toEqual({
    ...defaultState,
    inProgress: false,
    error: undefined
  });
});

it("should set error and toggle off in progress on fail", () => {
  const errorMessage = "something went wrong";
  const state = {
    ...defaultState,
    inProgress: true
  };
  const action = emailVerificationFail(new Error(errorMessage));
  expect(emailVerificationReducer(state, action)).toEqual({
    ...defaultState,
    error: errorMessage,
    inProgress: false
  });
});
