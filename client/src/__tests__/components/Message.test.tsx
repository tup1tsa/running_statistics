import { shallow } from "enzyme";
import React from "react";
import { Message } from "../../application/components/Message";

it("should render success message properly", () => {
  const message = "everything is fine";
  const isError: "0" = "0";
  const props = {
    match: {
      params: {
        encodedMessage: btoa(message),
        isError
      }
    }
  };
  const element = shallow(<Message {...props} />);
  expect(element.find("div").props().children).toBe(message);
});

it("should render error message properly", () => {
  const errorMessage = "something went wrong";
  const isError: "1" = "1";
  const props = {
    match: {
      params: {
        encodedMessage: btoa(errorMessage),
        isError
      }
    }
  };
  const element = shallow(<Message {...props} />);
  expect(element.find("div.errorMessage").props().children).toBe(errorMessage);
});
