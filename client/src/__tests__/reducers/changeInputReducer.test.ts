import { changeInput, stopGps } from "../../application/actions/actionCreators";
import { changeInputReducer } from "../../application/reducers/changeInputReducer";

const defaultState = {
  login: "abba",
  email: "abba@gmail.com",
  passwordFirstInput: "topSecret",
  passwordSecondInput: "topSecret"
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(changeInputReducer(defaultState, action)).toEqual(defaultState);
});

it("should change login", () => {
  const changeLoginAction = changeInput({
    fieldName: "login",
    value: "somma"
  });
  expect(changeInputReducer(defaultState, changeLoginAction)).toEqual({
    ...defaultState,
    login: "somma"
  });
});

it("should change email", () => {
  const changeEmailAction = changeInput({
    fieldName: "email",
    value: "some@mail.ru"
  });
  expect(changeInputReducer(defaultState, changeEmailAction)).toEqual({
    ...defaultState,
    email: "some@mail.ru"
  });
});

it("should change first password input", () => {
  const changePasswordAction = changeInput({
    fieldName: "password",
    value: "dumb"
  });
  expect(changeInputReducer(defaultState, changePasswordAction)).toEqual({
    ...defaultState,
    passwordFirstInput: "dumb"
  });
});

it("should change password copy input", () => {
  const changePasswordCopyAction = changeInput({
    fieldName: "passwordCopy",
    value: "bamba"
  });
  expect(changeInputReducer(defaultState, changePasswordCopyAction)).toEqual({
    ...defaultState,
    passwordSecondInput: "bamba"
  });
});
