import {
  changeLoginEmail,
  changeLoginPassword,
  loginFail,
  loginStart,
  loginSuccess,
  logout,
  removeLoginError,
  stopGps
} from "../../application/actions/actionCreators";
import loginReducer, {
  LoginState
} from "../../application/reducers/loginReducer";

const defaultState: LoginState = {
  inProgress: false,
  isLoggedIn: false,
  email: "",
  password: ""
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

it("should remove login error", () => {
  const state = { ...defaultState, errorMessage: "some error" };
  const action = removeLoginError();
  expect(loginReducer(state, action)).toEqual(defaultState);
});

it("should toggle off progress and logged in field on sucess login", () => {
  const state = {
    ...defaultState,
    inProgress: true,
    email: "sdsa",
    password: "sbsa"
  };
  const user = {
    name: "some name",
    email: "some email",
    isEmailVerified: true
  };
  expect(loginReducer(state, loginSuccess(user))).toEqual({
    ...defaultState,
    inProgress: false,
    isLoggedIn: true,
    email: "",
    password: ""
  });
});

it("should reset state on logout", () => {
  const state = {
    ...defaultState,
    inProgress: true,
    isLoggedIn: true,
    errorMessage: "some message"
  };
  expect(loginReducer(state, logout())).toEqual({
    ...defaultState,
    inProgress: false,
    isLoggedIn: false
  });
});

it("should change email", () => {
  const action = changeLoginEmail("gimma@mail.com");
  expect(loginReducer(defaultState, action)).toEqual({
    ...defaultState,
    email: "gimma@mail.com"
  });
});

it("should change password", () => {
  const action = changeLoginPassword("bas");
  expect(loginReducer(defaultState, action)).toEqual({
    ...defaultState,
    password: "bas"
  });
});
