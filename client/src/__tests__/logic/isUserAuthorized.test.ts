import { isUserAuthorized } from "../../application/logic/isUserAuthorized";
import { testGlobalState } from "../connectors/PathWatcherConnector.test";

const defaultLoginState = {
  email: "",
  password: "",
  isLoggedIn: true,
  inProgress: false
};

it("should return true, if user is logged in, email is verified", () => {
  const state = {
    ...testGlobalState(),
    user: { name: "", email: "", isEmailVerified: true },
    login: defaultLoginState
  };
  expect(isUserAuthorized(state)).toBe(true);
});

it("should return false if user email is not verified", () => {
  const state = {
    ...testGlobalState(),
    user: { name: "", email: "", isEmailVerified: true }
  };
  expect(isUserAuthorized(state)).toBe(false);
});

it("should return false if user is not logged in", () => {
  const state = {
    ...testGlobalState(),
    user: { name: "", email: "", isEmailVerified: true },
    login: { ...defaultLoginState, isLoggedIn: false }
  };
  expect(isUserAuthorized(state)).toBe(false);
});

it("should return false if user is currently being logged in", () => {
  const state = {
    ...testGlobalState(),
    user: { name: "", email: "", isEmailVerified: true },
    login: { ...defaultLoginState, isLoggedIn: false, inProgress: true }
  };
  expect(isUserAuthorized(state)).toBe(false);
});
