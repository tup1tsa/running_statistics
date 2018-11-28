import React from "react";
import {
  RegistrationFieldName,
  RegistrationFieldPayload
} from "../actions/actions";
import { Input } from "./Input";

interface Props {
  readonly changeRegistrationField: (payload: RegistrationFieldPayload) => void;
  readonly register: () => void;

  readonly loginError?: string;
  readonly emailError?: string;
  readonly passwordError?: string;
  readonly passwordCopyError?: string;
}

export const Registration = (props: Props) => {
  const changeField = (fieldName: RegistrationFieldName, value: string) => {
    props.changeRegistrationField({ fieldName, value });
  };
  return (
    <div>
      <Input
        id="login"
        label="Login"
        errorMessage={props.loginError}
        onChange={changeField.bind(null, "login")}
      />
      <Input
        id="email"
        label="Email"
        errorMessage={props.emailError}
        onChange={changeField.bind(null, "email")}
      />
      <Input
        id="password"
        label="Password"
        errorMessage={props.passwordError}
        onChange={changeField.bind(null, "password")}
      />
      <Input
        id="passwordCopy"
        label="Repeat your password"
        errorMessage={props.passwordCopyError}
        onChange={changeField.bind(null, "passwordCopy")}
      />
      <button onClick={props.register}>Register</button>
    </div>
  );
};
