import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../../application/components/atoms/Input";

const defaultProps = {
  id: "someId",
  label: "some input label"
};

it("should render input properly", () => {
  const defaultValue = "default";
  const placeholder = "type your email here";
  const id = "userEmail";
  const type = "password";
  const wrapper = shallow(
    <Input
      {...defaultProps}
      id={id}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
  const inputProps = wrapper.find("input").props();
  expect(inputProps.id).toBe(id);
  expect(inputProps.defaultValue).toBe(defaultValue);
  expect(inputProps.placeholder).toBe(placeholder);
  expect(inputProps.type).toBe(type);
});

it("should render input with default properties properly", () => {
  const wrapper = shallow(<Input {...defaultProps} />);
  const input = wrapper.find("input");
  expect(input.props().id).toBe(defaultProps.id);
  expect(input.props().type).toBe("text");
});

it("should pass error class if error message is provided", () => {
  const noErrorWrapper = shallow(<Input {...defaultProps} />);
  const errorWrapper = shallow(
    <Input {...defaultProps} errorMessage="incorrect" />
  );
  expect(noErrorWrapper.find(".inputWrapper.error").length).toBe(0);
  expect(errorWrapper.find(".inputWrapper.error").length).toBe(1);
});

it("should render correct label", () => {
  const label = "your email";
  const id = "email";
  const wrapper = shallow(<Input {...defaultProps} label={label} id={id} />);
  expect(wrapper.contains(<label htmlFor={id}>YOUR EMAIL</label>)).toBe(true);
});

it("should render correct label with error message", () => {
  const label = "your name";
  const id = "name";
  const errorMessage = "name is empty";
  const expectedLabel = "YOUR NAME (name is empty)";
  const wrapper = shallow(
    <Input
      {...defaultProps}
      label={label}
      id={id}
      errorMessage={errorMessage}
    />
  );
  expect(wrapper.contains(<label htmlFor={id}>{expectedLabel}</label>)).toBe(
    true
  );
});

it("should use on change handler properly", () => {
  const onChangeMock = jest.fn();
  const wrapper = shallow(<Input {...defaultProps} onChange={onChangeMock} />);
  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "newValue" } });
  expect(onChangeMock.mock.calls.length).toBe(1);
  expect(onChangeMock.mock.calls[0][0]).toBe("newValue");
});

it("should render icon block", () => {
  const icon = <p>I am icon</p>;
  const wrapper = shallow(<Input {...defaultProps} rightIcon={icon} />);
  expect(wrapper.find("p").text()).toBe("I am icon");
});
