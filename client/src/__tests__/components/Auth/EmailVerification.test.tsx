import { shallow } from "enzyme";
import React from "react";
import EmailVerification from "../../../application/components/Auth/EmailVerification";
import Modal from "../../../application/components/molecules/Modal";

const defaultProps = {
  match: { params: { hash: "" } },
  inProgress: false,
  verify: jest.fn(),
  removeErrors: jest.fn()
};

it("should render modal if error message is present", () => {
  const noErrorWrapper = shallow(<EmailVerification {...defaultProps} />);
  expect(noErrorWrapper.find(Modal).props().isOpen).toBe(false);

  const errorMessage = "something went wrong";
  const removeErrors = jest.fn();
  const wrapper = shallow(
    <EmailVerification
      {...defaultProps}
      error={errorMessage}
      removeErrors={removeErrors}
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
  expect(removeErrors.mock.calls.length).toBe(1);
});

it("should render text when in progress", () => {
  const wrapper = shallow(
    <EmailVerification {...defaultProps} inProgress={true} />
  );
  expect(wrapper.find("p").text()).toBe("Please, wait.");

  const finishedWrapper = shallow(
    <EmailVerification {...defaultProps} inProgress={false} />
  );
  expect(finishedWrapper.find("p").length).toBe(0);
});

it("should start verification on mount", () => {
  const verify = jest.fn();
  shallow(
    <EmailVerification
      {...defaultProps}
      verify={verify}
      match={{ params: { hash: "hash" } }}
    />
  );
  expect(verify.mock.calls.length).toBe(1);
  expect(verify.mock.calls[0][0]).toBe("hash");
});
