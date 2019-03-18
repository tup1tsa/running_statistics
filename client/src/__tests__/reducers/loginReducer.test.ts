import {
  loginFail,
  loginStart,
  loginSuccess,
  logout,
  stopGps
} from "../../application/actions/actionCreators";
import loginReducer, {
  LoginState
} from "../../application/reducers/loginReducer";

const defaultState: LoginState = {
  inProgress: false,
  isLoggedIn: false
};

it("should not change state if action is not correct", () => {
  const action = stopGps();
  expect(loginReducer(defaultState, action)).toEqual(defaultState);
});

it("should toggle progress state on login start", () => {
  expect(loginReducer(defaultState, loginStart()).inProgress).toBe(true);
});

it("should toggle off progress field and set error on fail", () => {
  const state = { ...defaultState, inProgress: true };
  const errorMessage = "unexpected error";
  const error = new Error(errorMessage);
  expect(loginReducer(state, loginFail(error))).toEqual({
    ...defaultState,
    inProgress: false,
    errorMessage
  });
});

it("should toggle off progess and logged in field on sucess login", () => {
  const state = { ...defaultState, inProgress: true };
  const user = {
    name: "",
    email: "",
    isEmailVerified: true
  };
  expect(loginReducer(state, loginSuccess(user))).toEqual({
    ...defaultState,
    inProgress: false,
    isLoggedIn: true
  });
});

it("should reset state on logout", () => {
  const state = {
    inProgress: true,
    isLoggedIn: true,
    errorMessage: "some message"
  };
  expect(loginReducer(state, logout())).toEqual({
    inProgress: false,
    isLoggedIn: false
  });
});
