import {
  changeRegistrationField,
  stopGps
} from "../../../application/actions/actionCreators";
import { changeRegistrationFieldReducer } from "../../../application/reducers/registration/changeRegistrationFieldReducer";

const defaultState = {
  login: "abba",
  email: "abba@gmail.com",
  passwordFirstInput: "topSecret",
  passwordSecondInput: "topSecret"
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(changeRegistrationFieldReducer(defaultState, action)).toEqual(
    defaultState
  );
});

it("should change login", () => {
  const changeLoginAction = changeRegistrationField({
    fieldName: "login",
    value: "somma"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changeLoginAction)
  ).toEqual({
    ...defaultState,
    login: "somma"
  });
});

it("should change email", () => {
  const changeEmailAction = changeRegistrationField({
    fieldName: "email",
    value: "some@mail.ru"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changeEmailAction)
  ).toEqual({
    ...defaultState,
    email: "some@mail.ru"
  });
});

it("should change first password input", () => {
  const changePasswordAction = changeRegistrationField({
    fieldName: "password",
    value: "dumb"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changePasswordAction)
  ).toEqual({
    ...defaultState,
    passwordFirstInput: "dumb"
  });
});

it("should change password copy input", () => {
  const changePasswordCopyAction = changeRegistrationField({
    fieldName: "passwordCopy",
    value: "bamba"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changePasswordCopyAction)
  ).toEqual({
    ...defaultState,
    passwordSecondInput: "bamba"
  });
});
