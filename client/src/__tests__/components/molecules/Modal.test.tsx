import { shallow } from "enzyme";
import React from "react";
import Popup from "reactjs-popup";
import Modal from "../../../application/components/molecules/Modal";
const defaultProps = {
  text: ""
};

it("should render with default props properly", () => {
  const wrapper = shallow(<Modal {...defaultProps} />);
  expect(wrapper.find(".error").length).toBe(0);
  expect(wrapper.find(Popup).props().open).toBe(false);
});

it("should render text", () => {
  const text = "some text";
  const wrapper = shallow(<Modal {...defaultProps} text={text} />);
  expect(wrapper.find("span").text()).toBe(text);
});

it("should pass isOpen and onClose props to popup", () => {
  const isOpen = true;
  const onClose = jest.fn();
  const wrapper = shallow(
    <Modal {...defaultProps} isOpen={isOpen} onClose={onClose} />
  );
  const popupProps = wrapper.find(Popup).props();
  expect(popupProps.open).toBe(isOpen);
  expect(popupProps.onClose).toBe(onClose);
  const closedPopup = shallow(<Modal {...defaultProps} isOpen={false} />);
  expect(closedPopup.find(Popup).props().open).toBe(false);
});

it("should render error class", () => {
  const wrapper = shallow(<Modal {...defaultProps} isError={true} />);
  expect(wrapper.find("#popupWrapper.error").length).toBe(1);
});
