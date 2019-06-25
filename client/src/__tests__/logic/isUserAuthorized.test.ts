import { isUserAuthorized } from "../../application/logic/isUserAuthorized";
import { UserState } from "../../application/reducers/userReducer";
import { testGlobalState } from "../connectors/PathWatcherConnector.test";

const defaultUserState: UserState = {
  displayName: null,
  email: null,
  isLoggedIn: true,
  emailVerified: true,
  photoURL: null,
  uid: ""
};

it("should return true, if user is logged in, email is verified", () => {
  const state = {
    ...testGlobalState(),
    user: { ...defaultUserState, isLoggedIn: true, emailVerified: true }
  };
  expect(isUserAuthorized(state)).toBe(true);
});

it("should return false if user email is not verified", () => {
  const state = {
    ...testGlobalState(),
    user: { ...defaultUserState, emailVerified: false }
  };
  expect(isUserAuthorized(state)).toBe(false);
});

it("should return false if user is not logged in", () => {
  const state = {
    ...testGlobalState(),
    user: { ...defaultUserState, isLoggedIn: false }
  };
  expect(isUserAuthorized(state)).toBe(false);
});
