import React from "react";
import { UserState } from "../reducers/userReducer";
import "../scss/Header.scss";

export interface HeaderDispatchProps {
  readonly goToRegistrationPage: () => void;
  readonly goToLoginPage: () => void;
  readonly logout: () => void;
}

export interface HeaderStateProps {
  readonly user: UserState;
  readonly isUserLoggedIn: boolean;
  readonly isLoggingIn: boolean;
}

export const Header = (props: HeaderDispatchProps & HeaderStateProps) => {
  const {
    goToRegistrationPage,
    goToLoginPage,
    logout,
    user,
    isUserLoggedIn,
    isLoggingIn
  } = props;
  const { name, isEmailVerified } = user;
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
  if (isUserLoggedIn) {
    content = (
      <>
        <span title={isEmailVerified ? "" : "Email is not verified"}>
          {name}
          {isEmailVerified ? "" : "*"}
        </span>
        <button className="blue" onClick={logout}>
          Sign out
        </button>
      </>
    );
  }
  return <div className="header">{content}</div>;
};
