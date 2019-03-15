import {
  changeRegistrationEmail,
  changeRegistrationName,
  toggleSaving
} from "../../application/actions/actionCreators";
import userReducer, { UserState } from "../../application/reducers/userReducer";

const defaultState: UserState = {
  isLoggedIn: false,
  name: "",
  email: ""
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
