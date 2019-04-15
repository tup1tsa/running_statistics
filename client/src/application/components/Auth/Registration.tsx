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
import LoadingModal from "../molecules/LoadingModal";
import Modal from "../molecules/Modal";
import { PasswordInput } from "../molecules/PasswordInput";

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
  readonly error: string | null;
  readonly inProgress: boolean;
  readonly changeName: (name: string) => void;
  readonly changeEmail: (email: string) => void;
  readonly changePassword: (password: string) => void;
  readonly changePasswordConfirmation: (password: string) => void;
  readonly register: (userInfo: RegularRegistrationInfo) => void;
  readonly removeRegistrationError: () => void;
}

export const RegistrationFactory = ({
  name,
  email,
  password,
  passwordCopy,
  validateName: validateNameFunc,
  validateEmail: validateEmailFunc,
  validatePassword: validatePasswordFunc,
  changeName,
  changeEmail,
  changePassword,
  changePasswordConfirmation,
  register,
  error,
  removeRegistrationError,
  inProgress
}: RegistrationProps & Validators) => {
  const userInfo = {
    name,
    email,
    password,
    passwordConfirmation: passwordCopy
  };
  const isLoginValid = validateNameFunc(userInfo.name);
  const isEmailValid = validateEmailFunc(userInfo.email);
  const isPasswordValid = validatePasswordFunc(userInfo.password);
  const isPasswordCopyValid = passwordCopy === userInfo.password;
  const userInfoValid =
    isLoginValid && isEmailValid && isPasswordValid && isPasswordCopyValid;
  return (
    <form>
      <Modal
        text={error ? error : ""}
        isOpen={error !== null}
        isError={error != null}
        onClose={removeRegistrationError}
      />
      <LoadingModal isOpen={inProgress} />
      <Input
        id="name"
        label="Name"
        errorMessage={
          isLoginValid ? undefined : "name should be in range from 2 to 128"
        }
        onChange={changeName}
      />
      <Input
        id="email"
        label="Email"
        errorMessage={isEmailValid ? undefined : "email is invalid"}
        onChange={changeEmail}
      />
      <PasswordInput
        id="password"
        label="Password"
        errorMessage={
          isPasswordValid
            ? undefined
            : "password should be in range from 5 to 128"
        }
        onChange={changePassword}
      />
      <PasswordInput
        id="passwordCopy"
        label="Repeat password"
        errorMessage={
          isPasswordCopyValid ? undefined : "passwords do not match"
        }
        onChange={changePasswordConfirmation}
      />
      <button
        type="button"
        onClick={userInfoValid ? register.bind(null, userInfo) : undefined}
      >
        Register
      </button>
    </form>
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
