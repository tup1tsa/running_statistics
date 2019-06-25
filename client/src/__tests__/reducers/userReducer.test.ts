import {
  loginSuccess,
  logout,
  toggleSaving
} from "../../application/actions/actionCreators";
import userReducer, {
  User,
  UserState
} from "../../application/reducers/userReducer";

const defaultState: UserState = {
  displayName: null,
  email: "",
  emailVerified: false,
  photoURL: null,
  uid: "",
  isLoggedIn: false
};

it("should not change state if action is not correct", () => {
  const action = toggleSaving();
  expect(userReducer(defaultState, action)).toEqual(defaultState);
});

it("should set all data on login success", () => {
  const newUser: User = {
    displayName: "vonna",
    email: "vonna@gmail.com",
    emailVerified: true,
    photoURL: "some url",
    uid: "secret id"
  };
  const action = loginSuccess(newUser);
  expect(userReducer(defaultState, action)).toEqual({
    ...newUser,
    isLoggedIn: true
  });
});

it("should erase all data on logout", () => {
  const state = {
    ...defaultState,
    displayName: "sba",
    email: "fon@mail.com",
    emalVerified: true,
    photoURL: "some url",
    uid: "some id",
    isLoggedIn: true
  };
  expect(userReducer(state, logout())).toEqual({
    ...defaultState,
    displayName: null,
    email: null,
    emailVerified: false,
    photoURL: null,
    uid: "",
    isLoggedIn: false
  });
});
