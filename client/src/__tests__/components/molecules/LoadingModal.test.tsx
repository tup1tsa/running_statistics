import { shallow } from "enzyme";
import React from "react";
import Popup from "reactjs-popup";
import LoadingModal from "../../../application/components/molecules/LoadingModal";

it("should render closed and open modal", () => {
  const openedModal = shallow(<LoadingModal isOpen={true} />);
  const closedModal = shallow(<LoadingModal isOpen={false} />);
  expect(openedModal.find(Popup).props().open).toBe(true);
  expect(closedModal.find(Popup).props().open).toBe(false);
});

it("should render loading spinner", () => {
  const wrapper = shallow(<LoadingModal isOpen={true} />);
  expect(wrapper.find("img").length).toBe(1);
  expect(wrapper.find("img").props().src).toBe("/images/loader.gif");
});

it("should disallow closing via clicking", () => {
  const wrapper = shallow(<LoadingModal isOpen={true} />);
  const props = wrapper.find(Popup).props();
  expect(props.closeOnDocumentClick).toBe(false);
  expect(props.closeOnEscape).toBe(false);
});
