import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../../application/components/atoms/Input";
import { LoginFactory } from "../../../application/components/Auth/Login";

const defaultProps = {
  email: "",
  password: "",

  validateEmail: jest.fn().mockReturnValue(true),
  validatePassword: jest.fn().mockReturnValue(true),

  changeEmail: jest.fn(),
  changePassword: jest.fn(),
  login: jest.fn()
};

it("should send correct props to email input", () => {
  const changeEmail = jest.fn();
  const wrapper = shallow(
    <LoginFactory {...defaultProps} changeEmail={changeEmail} />
  );
  const emailInput = wrapper.find(Input).get(0);
  expect(emailInput.props.id).toBe("email");
  expect(emailInput.props.label).toBe("Email");
  expect(emailInput.props.errorMesssage).toBe(undefined);

  const onChangeHandler = emailInput.props.onChange;
  onChangeHandler("bas@gmail.com");
  expect(changeEmail.mock.calls.length).toBe(1);
  expect(changeEmail.mock.calls[0][0]).toEqual("bas@gmail.com");
});

it("should send correct error message to email if it is invalid", () => {
  const email = "sisab";
  const validateEmail = jest.fn().mockReturnValue(false);
  const wrapper = shallow(
    <LoginFactory
      {...defaultProps}
      validateEmail={validateEmail}
      email={email}
    />
  );
  expect(wrapper.find(Input).props().errorMessage).toBe("email is invalid");
  expect(validateEmail.mock.calls.length).toBe(1);
  expect(validateEmail.mock.calls[0][0]).toBe(email);
});

it("should send correct props to password input", () => {
  const changePassword = jest.fn();
  const wrapper = shallow(
    <LoginFactory {...defaultProps} changePassword={changePassword} />
  );
  const passwordInput = wrapper.find({
    id: "password",
    label: "Password"
  });
  expect(passwordInput.props().errorMessage).toBe(undefined);
  const onChangeHandler = passwordInput.props().onChange;
  onChangeHandler("super secret password");
  expect(changePassword.mock.calls.length).toBe(1);
  expect(changePassword.mock.calls[0][0]).toEqual("super secret password");
});

it("should send correct error message to password if it is invalid", () => {
  const password = "bagama";
  const validatePassword = jest.fn().mockReturnValue(false);
  const wrapper = shallow(
    <LoginFactory
      {...defaultProps}
      validatePassword={validatePassword}
      password={password}
    />
  );
  expect(wrapper.find({ id: "password" }).props().errorMessage).toBe(
    "password should be in range from 5 to 128"
  );
  expect(validatePassword.mock.calls.length).toBe(1);
  expect(validatePassword.mock.calls[0][0]).toBe(password);
});

it("button should start login process", () => {
  const login = jest.fn();
  const email = "cool@ba.bas";
  const password = "superSecret";
  const wrapper = shallow(
    <LoginFactory
      {...defaultProps}
      login={login}
      email={email}
      password={password}
    />
  );
  wrapper.find("button").simulate("click");
  expect(login.mock.calls.length).toBe(1);
  expect(login.mock.calls[0][0]).toEqual({
    email,
    password
  });
});

it("button should not start login process if user info is incorrect", () => {
  const login = jest.fn();
  const failedValidator = jest.fn().mockReturnValue(false);

  const badEmail = shallow(
    <LoginFactory
      {...defaultProps}
      login={login}
      validateEmail={failedValidator}
    />
  );
  const badPassword = shallow(
    <LoginFactory
      {...defaultProps}
      login={login}
      validatePassword={failedValidator}
    />
  );

  badEmail.find("button").simulate("click");
  badPassword.find("button").simulate("click");

  expect(login.mock.calls.length).toBe(0);
});
