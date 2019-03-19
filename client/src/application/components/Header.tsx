import React from "react";
import "../css/Header.css";

export interface HeaderDispatchProps {
  readonly goToRegistrationPage: () => void;
  readonly goToLoginPage: () => void;
  readonly logout: () => void;
}

export interface HeaderStateProps {
  readonly isUserLoggedIn: boolean;
}

export const Header = (props: HeaderDispatchProps & HeaderStateProps) => {
  const { goToRegistrationPage, goToLoginPage, logout, isUserLoggedIn } = props;
  if (isUserLoggedIn) {
    return (
      <div className="header">
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
