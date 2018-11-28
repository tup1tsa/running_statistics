import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../application/components/Input";
import { Registration } from "../../application/components/Registration";

const defaultProps = {
  changeRegistrationField: jest.fn(),
  register: jest.fn()
};

it("should render four inputs and a button", () => {
  const wrapper = shallow(<Registration {...defaultProps} />);
  expect(wrapper.find(Input).length).toBe(4);
  expect(wrapper.find("button").length).toBe(1);
});

it("should send correct props to login input", () => {
  const changeRegField = jest.fn();
  const loginError = "login is incorrect";
  const wrapper = shallow(
    <Registration
      {...defaultProps}
      loginError={loginError}
      changeRegistrationField={changeRegField}
    />
  );
  const loginInput = wrapper.find(Input).get(0);
  expect(loginInput.props.id).toBe("login");
  expect(loginInput.props.label).toBe("Login");
  expect(loginInput.props.errorMessage).toBe(loginError);

  const onChangeHandler = loginInput.props.onChange;
  onChangeHandler("new login");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "login",
    value: "new login"
  });
});

it("should send correct props to email input", () => {
  const changeRegField = jest.fn();
  const emailError = "emailError";
  const wrapper = shallow(
    <Registration
      {...defaultProps}
      emailError={emailError}
      changeRegistrationField={changeRegField}
    />
  );
  const emailInput = wrapper.find(Input).get(1);
  expect(emailInput.props.id).toBe("email");
  expect(emailInput.props.label).toBe("Email");
  expect(emailInput.props.errorMessage).toBe(emailError);

  const onChangeHandler = emailInput.props.onChange;
  onChangeHandler("some@gmail.com");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "email",
    value: "some@gmail.com"
  });
});

it("should send correct props to first password input", () => {
  const changeRegField = jest.fn();
  const passwordError = "some password error";
  const wrapper = shallow(
    <Registration
      {...defaultProps}
      passwordError={passwordError}
      changeRegistrationField={changeRegField}
    />
  );
  const firstPasswordInput = wrapper.find(Input).get(2);
  expect(firstPasswordInput.props.id).toBe("password");
  expect(firstPasswordInput.props.label).toBe("Password");
  expect(firstPasswordInput.props.errorMessage).toBe(passwordError);

  const onChangeHandler = firstPasswordInput.props.onChange;
  onChangeHandler("super secret password");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "password",
    value: "super secret password"
  });
});

it("should send correct props to second password input", () => {
  const changeRegField = jest.fn();
  const passwordCopyError = "passwords are not the same";
  const wrapper = shallow(
    <Registration
      {...defaultProps}
      passwordCopyError={passwordCopyError}
      changeRegistrationField={changeRegField}
    />
  );
  const secondPasswordInput = wrapper.find(Input).get(3);
  expect(secondPasswordInput.props.id).toBe("passwordCopy");
  expect(secondPasswordInput.props.label).toBe("Repeat your password");
  expect(secondPasswordInput.props.errorMessage).toBe(passwordCopyError);

  const onChangeHandler = secondPasswordInput.props.onChange;
  onChangeHandler("password again");
  expect(changeRegField.mock.calls.length).toBe(1);
  expect(changeRegField.mock.calls[0][0]).toEqual({
    fieldName: "passwordCopy",
    value: "password again"
  });
});

it("button should start registration", () => {
  const registerMock = jest.fn();
  const wrapper = shallow(
    <Registration {...defaultProps} register={registerMock} />
  );
  wrapper.find("button").simulate("click");
  expect(registerMock.mock.calls.length).toBe(1);
});
