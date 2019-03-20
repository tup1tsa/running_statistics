import React from "react";
import {
  RegularRegistrationInfo,
  ValidateEmail,
  validateEmail,
  ValidateName,
  validateName,
  ValidatePassword,
  validatePassword
} from "running_app_core";
import { Input } from "../atoms/Input";

interface Validators {
  validateName: ValidateName;
  validateEmail: ValidateEmail;
  validatePassword: ValidatePassword;
}

export interface RegistrationProps {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordCopy: string;
  readonly changeName: (name: string) => void;
  readonly changeEmail: (email: string) => void;
  readonly changePassword: (password: string) => void;
  readonly changePasswordConfirmation: (password: string) => void;
  readonly register: (userInfo: RegularRegistrationInfo) => void;
}

export const RegistrationFactory = (props: RegistrationProps & Validators) => {
  const userInfo = {
    name: props.name,
    email: props.email,
    password: props.password,
    passwordConfirmation: props.passwordCopy
  };
  const isLoginValid = props.validateName(userInfo.name);
  const isEmailValid = props.validateEmail(userInfo.email);
  const isPasswordValid = props.validatePassword(userInfo.password);
  const isPasswordCopyValid = props.passwordCopy === userInfo.password;
  const userInfoValid =
    isLoginValid && isEmailValid && isPasswordValid && isPasswordCopyValid;
  return (
    <div>
      <Input
        id="name"
        label="Name"
        errorMessage={
          isLoginValid ? undefined : "name should be in range from 2 to 128"
        }
        onChange={props.changeName}
      />
      <Input
        id="email"
        label="Email"
        errorMessage={isEmailValid ? undefined : "email is invalid"}
        onChange={props.changeEmail}
      />
      <Input
        id="password"
        label="Password"
        errorMessage={
          isPasswordValid
            ? undefined
            : "password should be in range from 5 to 128"
        }
        onChange={props.changePassword}
      />
      <Input
        id="passwordCopy"
        label="Repeat your password"
        errorMessage={
          isPasswordCopyValid ? undefined : "passwords do not match"
        }
        onChange={props.changePasswordConfirmation}
      />
      <button
        onClick={
          userInfoValid ? props.register.bind(null, userInfo) : undefined
        }
      >
        Register
      </button>
    </div>
  );
};

export const Registration = (props: RegistrationProps) => (
  <RegistrationFactory
    {...props}
    validateName={validateName}
    validateEmail={validateEmail}
    validatePassword={validatePassword}
  />
);
