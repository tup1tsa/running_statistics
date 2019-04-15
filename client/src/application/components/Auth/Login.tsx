import React from "react";
import {
  RegularLoginInfo,
  ValidateEmail,
  validateEmail,
  ValidatePassword,
  validatePassword
} from "running_app_core";
import { Input } from "../atoms/Input";
import LoadingModal from "../molecules/LoadingModal";
import Modal from "../molecules/Modal";
import { PasswordInput } from "../molecules/PasswordInput";

interface Validators {
  validateEmail: ValidateEmail;
  validatePassword: ValidatePassword;
}

export interface LoginStateProps {
  readonly email: string;
  readonly password: string;
  readonly errorMessage?: string;
  readonly isLoggingIn: boolean;
}

export interface LoginDispatchProps {
  readonly changeEmail: (email: string) => void;
  readonly changePassword: (password: string) => void;
  readonly login: (loginInfo: RegularLoginInfo) => void;
  readonly removeLoginError: () => void;
}

export const LoginFactory = ({
  validateEmail: validateEmailFunc,
  validatePassword: validatePasswordFunc,
  email,
  password,
  changeEmail,
  changePassword,
  login,
  errorMessage,
  removeLoginError,
  isLoggingIn
}: LoginStateProps & LoginDispatchProps & Validators) => {
  const isEmailValid = validateEmailFunc(email);
  const isPasswordValid = validatePasswordFunc(password);
  const startLogin = () => {
    if (!isEmailValid) {
      return;
    }
    if (!isPasswordValid) {
      return;
    }
    login({ email, password });
  };
  return (
    <form>
      <Modal
        isOpen={!!errorMessage}
        text={errorMessage ? errorMessage : ""}
        isError={true}
        onClose={removeLoginError}
      />
      <LoadingModal isOpen={isLoggingIn} />
      <Input
        id="email"
        label="Email"
        onChange={changeEmail}
        errorMessage={isEmailValid ? undefined : "email is invalid"}
      />
      <PasswordInput
        id="password"
        label="Password"
        onChange={changePassword}
        errorMessage={
          isPasswordValid
            ? undefined
            : "password should be in range from 5 to 128"
        }
      />
      <button type="button" onClick={startLogin}>
        Login
      </button>
    </form>
  );
};

const Login = (props: LoginStateProps & LoginDispatchProps) => (
  <LoginFactory
    {...props}
    validateEmail={validateEmail}
    validatePassword={validatePassword}
  />
);

export default Login;
