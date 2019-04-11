import React from "react";

export interface AuthCheckerProps {
  readonly isLoggedIn: boolean;
  readonly isLoggingIn: boolean;
  readonly isEmailVerified: boolean;
  readonly loginErrorMessage?: string;
}

export const AuthChecker = (props: AuthCheckerProps) => {
  const { isLoggedIn, isLoggingIn, isEmailVerified, loginErrorMessage } = props;
  if (loginErrorMessage) {
    return <p>{loginErrorMessage}</p>;
  }
  if (isLoggingIn) {
    return <p>Trying to log in. Please, wait</p>;
  }
  if (!isLoggedIn) {
    return <p>You should be logged in in order to use this page</p>;
  }
  if (!isEmailVerified) {
    return <p>Email should be verified</p>;
  }
  return null;
};
