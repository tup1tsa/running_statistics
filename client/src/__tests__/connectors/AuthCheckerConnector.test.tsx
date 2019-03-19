import { mapStateToProps } from "../../application/connectors/AuthCheckerConnector";
import { testGlobalState } from "./PathWatcherConnector.test";

it("should pass correct state props to the component", () => {
  const globalState = testGlobalState();
  expect(mapStateToProps(globalState)).toEqual({
    isLoggedIn: globalState.login.isLoggedIn,
    isLoggingIn: globalState.login.inProgress,
    isEmailVerified: globalState.user.isEmailVerified,
    loginErrorMessage: globalState.login.errorMessage
  });
});
