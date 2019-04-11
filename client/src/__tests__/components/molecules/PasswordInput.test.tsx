import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallow } from "enzyme";
import React from "react";
import { Input } from "../../../application/components/atoms/Input";
import { PasswordInput } from "../../../application/components/molecules/PasswordInput";

const defaultProps = {
  id: "password",
  label: "your password",
  onChange: jest.fn(),
  errorMessage: "something went wrong"
};

it("should forward props to Input", () => {
  const wrapper = shallow(<PasswordInput {...defaultProps} />);
  expect(wrapper.find(defaultProps).length).toBe(1);
});

it("should render proper icon and type by default to input", () => {
  const wrapper = shallow(<PasswordInput {...defaultProps} />);
  const innerInput = wrapper.find(Input);
  const fontAwesomeIcon = wrapper
    .find(Input)
    .dive()
    .find(FontAwesomeIcon);
  expect(fontAwesomeIcon.props().icon).toBe("eye-slash");
  expect(innerInput.props().type).toBe("password");
});

it("should toggle icon and input type on icon click", () => {
  const wrapper = shallow(<PasswordInput {...defaultProps} />);
  const getIconName = () =>
    wrapper
      .find(Input)
      .dive()
      .find(FontAwesomeIcon)
      .props().icon;

  const innerInput = wrapper.find(Input);
  const iconWrapper = innerInput.dive().find(".iconWrapper");
  iconWrapper.simulate("click");
  expect(getIconName()).toBe("eye");
  expect(wrapper.find(Input).props().type).toBe("text");
  iconWrapper.simulate("click");
  expect(getIconName()).toBe("eye-slash");
  expect(wrapper.find(Input).props().type).toBe("password");
});
