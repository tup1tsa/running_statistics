import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../application/components/Input";

const defaultProps = {
  id: "someId",
  label: "some input label"
};

it("should render input properly", () => {
  const type = "email";
  const defaultValue = "default";
  const placeholder = "type your email here";
  const id = "userEmail";
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
  expect(inputProps.type).toBe(type);
  expect(inputProps.defaultValue).toBe(defaultValue);
  expect(inputProps.placeholder).toBe(placeholder);
});

it("should render input with default properties properly", () => {
  const wrapper = shallow(<Input {...defaultProps} />);
  const input = wrapper.find("input");
  expect(input.props().id).toBe(defaultProps.id);
  expect(input.props().type).toBe("text");
});

it("should render error block if error message is defined", () => {
  const noErrorWrapper = shallow(<Input {...defaultProps} />);
  const errorWrapper = shallow(
    <Input {...defaultProps} errorMessage="incorrect" />
  );
  expect(noErrorWrapper.find(".inputError").length).toBe(0);
  expect(errorWrapper.contains(<p className="inputError">incorrect</p>)).toBe(
    true
  );
});

it("should render label properly", () => {
  const label = "very important input";
  const id = "email";
  const wrapper = shallow(<Input {...defaultProps} label={label} id={id} />);
  expect(wrapper.contains(<label htmlFor={id}>{label}</label>)).toBe(true);
});

it("should use on change handler properly", () => {
  const onChangeMock = jest.fn();
  const wrapper = shallow(<Input {...defaultProps} onChange={onChangeMock} />);
  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "newValue" } });
  expect(onChangeMock.mock.calls.length).toBe(1);
  expect(onChangeMock.mock.calls[0][0]).toBe("newValue");
});
