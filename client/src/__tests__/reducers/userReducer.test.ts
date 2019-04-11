import {
  changeRegistrationEmail,
  changeRegistrationName,
  emailVerificationSuccess,
  loginSuccess,
  logout,
  toggleSaving
} from "../../application/actions/actionCreators";
import userReducer, { UserState } from "../../application/reducers/userReducer";

const defaultState: UserState = {
  name: "",
  email: "",
  isEmailVerified: false
};

it("should not change state if action is not correct", () => {
  const action = toggleSaving();
  expect(userReducer(defaultState, action)).toEqual(defaultState);
});

it("should change name on registration name change", () => {
  const action = changeRegistrationName("monna");
  expect(userReducer(defaultState, action)).toEqual({
    ...defaultState,
    name: "monna"
  });
});

it("should change email on registration email change", () => {
  const action = changeRegistrationEmail("son@gmail.com");
  expect(userReducer(defaultState, action)).toEqual({
    ...defaultState,
    email: "son@gmail.com"
  });
});

it("should change name and email on login success", () => {
  const user = {
    name: "vonna",
    email: "vonna@gmail.com",
    isEmailVerified: true
  };
  const action = loginSuccess(user);
  expect(userReducer(defaultState, action)).toEqual(user);
});

it("should erase name and email on logout", () => {
  const state = {
    ...defaultState,
    name: "sba",
    email: "fon@mail.com",
    isEmalVerified: true
  };
  expect(userReducer(state, logout())).toEqual({
    ...defaultState,
    name: "",
    email: "",
    isEmailVerified: false
  });
});

it("should change email verification status to true on success verification", () => {
  const state = {
    ...defaultState,
    isEmailVerified: false
  };
  expect(userReducer(state, emailVerificationSuccess())).toEqual({
    ...defaultState,
    isEmailVerified: true
  });
});
