import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../../application/components/atoms/Input";
import { RegistrationFactory } from "../../../application/components/Auth/Registration";
import LoadingModal from "../../../application/components/molecules/LoadingModal";
import Modal from "../../../application/components/molecules/Modal";
import { PasswordInput } from "../../../application/components/molecules/PasswordInput";

const defaultProps = {
  name: "",
  email: "",
  password: "",
  passwordCopy: "",
  error: null,
  inProgress: false,

  validateName: jest.fn().mockReturnValue(true),
  validateEmail: jest.fn().mockReturnValue(true),
  validatePassword: jest.fn().mockReturnValue(true),

  changeName: jest.fn(),
  changeEmail: jest.fn(),
  changePassword: jest.fn(),
  changePasswordConfirmation: jest.fn(),
  register: jest.fn(),
  removeRegistrationError: jest.fn()
};

it("should render four inputs and a button", () => {
  const wrapper = shallow(<RegistrationFactory {...defaultProps} />);
  const regularInputs = wrapper.find(Input);
  const passwordInputs = wrapper.find(PasswordInput);
  expect(regularInputs.length + passwordInputs.length).toBe(4);
  expect(wrapper.find("button").length).toBe(1);
});

it("should send correct props to name input", () => {
  const changeName = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changeName={changeName} />
  );
  const nameInput = wrapper.find(Input).get(0);
  expect(nameInput.props.id).toBe("name");
  expect(nameInput.props.label).toBe("Name");
  expect(nameInput.props.errorMesssage).toBe(undefined);

  const onChangeHandler = nameInput.props.onChange;
  onChangeHandler("new login");
  expect(changeName.mock.calls.length).toBe(1);
  expect(changeName.mock.calls[0][0]).toEqual("new login");
});

it("should send correct error message to name if it is invalid", () => {
  const name = "my name";
  const validateName = jest.fn().mockReturnValue(false);
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      validateName={validateName}
      name={name}
    />
  );
  expect(wrapper.find(Input).get(0).props.errorMessage).toBe(
    "name should be in range from 2 to 128"
  );
  expect(validateName.mock.calls.length).toBe(1);
  expect(validateName.mock.calls[0][0]).toBe(name);
});

it("should send correct props to email input", () => {
  const changeEmail = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changeEmail={changeEmail} />
  );
  const emailInput = wrapper.find(Input).get(1);
  expect(emailInput.props.id).toBe("email");
  expect(emailInput.props.label).toBe("Email");
  expect(emailInput.props.errorMessage).toBe(undefined);

  const onChangeHandler = emailInput.props.onChange;
  onChangeHandler("some@gmail.com");
  expect(changeEmail.mock.calls.length).toBe(1);
  expect(changeEmail.mock.calls[0][0]).toEqual("some@gmail.com");
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
  const changePassword = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory {...defaultProps} changePassword={changePassword} />
  );
  const firstPasswordInput = wrapper.find({
    id: "password",
    label: "Password"
  });
  expect(firstPasswordInput.props().errorMessage).toBe(undefined);
  const onChangeHandler = firstPasswordInput.props().onChange;
  onChangeHandler("super secret password");
  expect(changePassword.mock.calls.length).toBe(1);
  expect(changePassword.mock.calls[0][0]).toEqual("super secret password");
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
  expect(wrapper.find({ id: "password" }).props().errorMessage).toBe(
    "password should be in range from 5 to 128"
  );
  expect(validatePassword.mock.calls.length).toBe(1);
  expect(validatePassword.mock.calls[0][0]).toBe(password);
});

it("should send correct props to second password input", () => {
  const changePasswordConfirmation = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      changePasswordConfirmation={changePasswordConfirmation}
    />
  );
  const secondPasswordInput = wrapper.find({
    id: "passwordCopy",
    label: "Repeat password"
  });
  expect(secondPasswordInput.props().errorMessage).toBe(undefined);

  const onChangeHandler = secondPasswordInput.props().onChange;
  onChangeHandler("password again");
  expect(changePasswordConfirmation.mock.calls.length).toBe(1);
  expect(changePasswordConfirmation.mock.calls[0][0]).toEqual("password again");
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
  expect(wrapper.find({ id: "passwordCopy" }).props().errorMessage).toBe(
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
      name={name}
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
    password,
    passwordConfirmation: password
  });
});

it("button should not start registration if user info is incorrect", () => {
  const registration = jest.fn();
  const failedValidator = jest.fn().mockReturnValue(false);

  const badLogin = shallow(
    <RegistrationFactory
      {...defaultProps}
      register={registration}
      validateName={failedValidator}
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

it("should render modal if error message is present", () => {
  const noErrorWrapper = shallow(<RegistrationFactory {...defaultProps} />);
  expect(noErrorWrapper.find(Modal).props().isOpen).toBe(false);

  const errorMessage = "something went wrong";
  const removeError = jest.fn();
  const wrapper = shallow(
    <RegistrationFactory
      {...defaultProps}
      error={errorMessage}
      removeRegistrationError={removeError}
    />
  );
  const modalProps = wrapper.find(Modal).props();
  expect(modalProps.isOpen).toBe(true);
  expect(modalProps.isError).toBe(true);
  expect(modalProps.text).toBe(errorMessage);
  if (!modalProps.onClose) {
    throw new Error("on close should be passed to the modal");
  }
  modalProps.onClose();
  expect(removeError.mock.calls.length).toBe(1);
});

it("should render loader when login is in progress", () => {
  const loadingWrapper = shallow(
    <RegistrationFactory {...defaultProps} inProgress={true} />
  );
  expect(loadingWrapper.find(LoadingModal).props().isOpen).toBe(true);

  const finishedLoadingWrapper = shallow(
    <RegistrationFactory {...defaultProps} inProgress={false} />
  );
  expect(finishedLoadingWrapper.find(LoadingModal).props().isOpen).toBe(false);
});
