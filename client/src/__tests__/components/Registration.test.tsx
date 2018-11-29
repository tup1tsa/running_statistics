import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../application/components/Input";
import { RegistrationFactory } from "../../application/components/Registration";

const defaultProps = {
  login: "",
  email: "",
  password: "",
  passwordCopy: "",

  validateLogin: jest.fn().mockReturnValue(true),
  validateEmail: jest.fn().mockReturnValue(true),
  validatePassword: jest.fn().mockReturnValue(true),

  changeInput: jest.fn(),
  register: jest.fn()
};

it("should render four inputs and a button", () => {
  const wrapper = shallow(<RegistrationFactory {...defaultProps} />);
  expect(wrapper.find(Input).length).toBe(4);
  expect(wrapper.find("button").length).toBe(1);
});

it("should send correct props to login input", () => {
  const changeRegField = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changeInput={changeRegField} />
  );
  const loginInput = wrapper.find(Input).get(0);
  expect(loginInput.props.id).toBe("login");
  expect(loginInput.props.label).toBe("Login");
  expect(loginInput.props.errorMesssage).toBe(undefined);

  const onChangeHandler = loginInput.props.onChange;
  onChangeHandler("new login");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "login",
    value: "new login"
  });
});

it("should send correct error message to login if it is invalid", () => {
  const login = "myLogin";
  const validateLogin = jest.fn().mockReturnValue(false);
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      validateLogin={validateLogin}
      login={login}
    />
  );
  expect(wrapper.find(Input).get(0).props.errorMessage).toBe(
    "login should be in range from 2 to 128"
  );
  expect(validateLogin.mock.calls.length).toBe(1);
  expect(validateLogin.mock.calls[0][0]).toBe(login);
});

it("should send correct props to email input", () => {
  const changeRegField = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changeInput={changeRegField} />
  );
  const emailInput = wrapper.find(Input).get(1);
  expect(emailInput.props.id).toBe("email");
  expect(emailInput.props.label).toBe("Email");
  expect(emailInput.props.errorMessage).toBe(undefined);

  const onChangeHandler = emailInput.props.onChange;
  onChangeHandler("some@gmail.com");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "email",
    value: "some@gmail.com"
  });
});

it("should send correct error message to email if it is invalid", () => {
  const email = "sisab";
  const validateEmail = jest.fn().mockReturnValue(false);
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      validateEmail={validateEmail}
      email={email}
    />
  );
  expect(wrapper.find(Input).get(1).props.errorMessage).toBe(
    "email is invalid"
  );
  expect(validateEmail.mock.calls.length).toBe(1);
  expect(validateEmail.mock.calls[0][0]).toBe(email);
});

it("should send correct props to first password input", () => {
  const changeRegField = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changeInput={changeRegField} />
  );
  const firstPasswordInput = wrapper.find(Input).get(2);
  expect(firstPasswordInput.props.id).toBe("password");
  expect(firstPasswordInput.props.label).toBe("Password");
  expect(firstPasswordInput.props.errorMessage).toBe(undefined);

  const onChangeHandler = firstPasswordInput.props.onChange;
  onChangeHandler("super secret password");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "password",
    value: "super secret password"
  });
});

it("should send correct error message to password if it is invalid", () => {
  const password = "bagama";
  const validatePassword = jest.fn().mockReturnValue(false);
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      validatePassword={validatePassword}
      password={password}
    />
  );
  expect(wrapper.find(Input).get(2).props.errorMessage).toBe(
    "password should be in range from 5 to 128"
  );
  expect(validatePassword.mock.calls.length).toBe(1);
  expect(validatePassword.mock.calls[0][0]).toBe(password);
});

it("should send correct props to second password input", () => {
  const changeRegField = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changeInput={changeRegField} />
  );
  const secondPasswordInput = wrapper.find(Input).get(3);
  expect(secondPasswordInput.props.id).toBe("passwordCopy");
  expect(secondPasswordInput.props.label).toBe("Repeat your password");
  expect(secondPasswordInput.props.errorMessage).toBe(undefined);

  const onChangeHandler = secondPasswordInput.props.onChange;
  onChangeHandler("password again");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "passwordCopy",
    value: "password again"
  });
});

it("should send correct error message to second password input if it is invalid", () => {
  const password = "bagama";
  const passwordCopy = "babst";
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      passwordCopy={passwordCopy}
      password={password}
    />
  );
  expect(wrapper.find(Input).get(3).props.errorMessage).toBe(
    "passwords do not match"
  );
});

it("button should start registration", () => {
  const registerMock = jest.fn();
  const name = "nick";
  const email = "cool@ba.bas";
  const password = "superSecret";
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      register={registerMock}
      login={name}
      email={email}
      password={password}
      passwordCopy={password}
    />
  );
  wrapper.find("button").simulate("click");
  expect(registerMock.mock.calls.length).toBe(1);
  expect(registerMock.mock.calls[0][0]).toEqual({
    name,
    email,
    password
  });
});

it("button should not start registration if user info is incorrect", () => {
  const registration = jest.fn();
  const failedValidator = jest.fn().mockReturnValue(false);

  const badLogin = shallow(
    <RegistrationFactory
      {...defaultProps}
      register={registration}
      validateLogin={failedValidator}
    />
  );
  const badEmail = shallow(
    <RegistrationFactory
      {...defaultProps}
      register={registration}
      validateEmail={failedValidator}
    />
  );
  const badPassword = shallow(
    <RegistrationFactory
      {...defaultProps}
      register={registration}
      validatePassword={failedValidator}
    />
  );
  const badSecondPassword = shallow(
    <RegistrationFactory
      {...defaultProps}
      register={registration}
      password="abbas"
      passwordCopy="bbasba"
    />
  );

  badLogin.find("button").simulate("click");
  badEmail.find("button").simulate("click");
  badPassword.find("button").simulate("click");
  badSecondPassword.find("button").simulate("click");

  expect(registration.mock.calls.length).toBe(0);
});
