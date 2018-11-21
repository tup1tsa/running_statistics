import {
  changeRegistrationField,
  stopGps
} from "../../application/actions/actionCreators";
import { changeRegistrationFieldReducer } from "../../application/reducers/changeRegistrationFieldReducer";

const defaultState = {
  login: "abba",
  email: "abba@gmail.com",
  password: "topSecret"
};

it("should not change state if action is incorrect", () => {
  const action = stopGps();
  expect(changeRegistrationFieldReducer(defaultState, action)).toEqual(
    defaultState
  );
});

it("should change proper field", () => {
  const changeLoginAction = changeRegistrationField({
    fieldName: "login",
    value: "somma"
  });
  const changeEmailAction = changeRegistrationField({
    fieldName: "email",
    value: "some@mail.ru"
  });
  const changePasswordActoin = changeRegistrationField({
    fieldName: "password",
    value: "dumb"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changeLoginAction)
  ).toEqual({
    ...defaultState,
    login: "somma"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changeEmailAction)
  ).toEqual({
    ...defaultState,
    email: "some@mail.ru"
  });
  expect(
    changeRegistrationFieldReducer(defaultState, changePasswordActoin)
  ).toEqual({
    ...defaultState,
    password: "dumb"
  });
});
