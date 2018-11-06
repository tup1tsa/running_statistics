import { shallow } from "enzyme";
import * as React from "react";
import { MESSAGES } from "../../application/common_files/config";
import { Message } from "../../application/components/Message";

it("should render success message properly", () => {
  const isError: "0" = "0";
  const props = {
    match: {
      params: {
        messageId: "2",
        isError
      }
    }
  };
  const element = shallow(<Message {...props} />);
  expect(element.find("div").props().children).toBe(MESSAGES[2]);
});

it("should render error message properly", () => {
  const isError: "1" = "1";
  const props = {
    match: {
      params: {
        messageId: "0",
        isError
      }
    }
  };
  const element = shallow(<Message {...props} />);
  expect(element.find("div.errorMessage").props().children).toBe(MESSAGES[0]);
});

it("should render default error message if message id is incorrect", () => {
  const isError: "0" = "0";
  const defaultError = "Unexpected error occured";
  const props = {
    match: {
      params: {
        messageId: "1500",
        isError
      }
    }
  };
  let element = shallow(<Message {...props} />);
  expect(element.find("div.errorMessage").props().children).toBe(defaultError);

  props.match.params.messageId = "sfdasf";
  element = shallow(<Message {...props} />);
  expect(element.find("div.errorMessage").props().children).toBe(defaultError);
});
