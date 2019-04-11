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
}

export const Header = (props: HeaderDispatchProps & HeaderStateProps) => {
  const {
    goToRegistrationPage,
    goToLoginPage,
    logout,
    user,
    isUserLoggedIn
  } = props;
  const { name, isEmailVerified } = user;
  if (isUserLoggedIn) {
    return (
      <div className="header">
        <span title={isEmailVerified ? "" : "Email is not verified"}>
          {name}
          {isEmailVerified ? "" : "*"}
        </span>
        <button className="blue" onClick={logout}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="header">
      <button className="blue" onClick={goToRegistrationPage}>
        Sign up
      </button>
      <button className="blue" onClick={goToLoginPage}>
        Sign in
      </button>
    </div>
  );
};
