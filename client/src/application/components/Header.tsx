import React from "react";
import "../scss/Header.scss";

export interface HeaderDispatchProps {
  readonly goToRegistrationPage: () => void;
  readonly goToLoginPage: () => void;
  readonly logout: () => void;
}

export interface HeaderStateProps {
  readonly isLoggingIn: boolean;
  readonly isLoggedIn: boolean;
  readonly name: string;
  readonly emailVerified: boolean;
}

export const Header = (props: HeaderDispatchProps & HeaderStateProps) => {
  const {
    goToRegistrationPage,
    goToLoginPage,
    logout,
    emailVerified,
    isLoggedIn,
    name,
    isLoggingIn
  } = props;

  let content = (
    <>
      <button className="blue" onClick={goToRegistrationPage}>
        Sign up
      </button>
      <button className="blue" onClick={goToLoginPage}>
        Sign in
      </button>
    </>
  );
  if (isLoggingIn) {
    content = (
      <>
        <span>Logging in</span>
        <img src="/images/loader.gif" />
      </>
    );
  }
  if (isLoggedIn) {
    content = (
      <>
        <span title={emailVerified ? "" : "Email is not verified"}>
          {name}
          {emailVerified ? "" : "*"}
        </span>
        <button className="blue" onClick={logout}>
          Sign out
        </button>
      </>
    );
  }
  return <div className="header">{content}</div>;
};
