import { isUserAuthorized } from "../../application/logic/isUserAuthorized";
import { testGlobalState } from "../connectors/PathWatcherConnector.test";

it("should return true, if user is logged in, email is verified", () => {
  const state = {
    ...testGlobalState(),
    user: { name: "", email: "", isEmailVerified: true },
    login: { isLoggedIn: true, inProgress: false }
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
    login: { isLoggedIn: false, inProgress: false }
  };
  expect(isUserAuthorized(state)).toBe(false);
});

it("should return false if user is currently being logged in", () => {
  const state = {
    ...testGlobalState(),
    user: { name: "", email: "", isEmailVerified: true },
    login: { isLoggedIn: false, inProgress: true }
  };
  expect(isUserAuthorized(state)).toBe(false);
});
