import { shallow } from "enzyme";
import React from "react";
import { AuthChecker } from "../../../application/components/Auth/AuthChecker";

const defaultProps = {
  isLoggedIn: false,
  isLoggingIn: false,
  isEmailVerified: false
};

it("should render text that tells that user should be logged in", () => {
  const element = shallow(<AuthChecker {...defaultProps} />);
  expect(element.find("p").text()).toBe(
    "You should be logged in in order to use this page"
  );
});

it("should render text that shows that user is currently logging in", () => {
  const element = shallow(<AuthChecker {...defaultProps} isLoggingIn={true} />);
  expect(element.find("p").text()).toBe("Trying to log in. Please, wait");
});

it("should render text that tells that email should be verified", () => {
  const element = shallow(
    <AuthChecker
      {...defaultProps}
      isLoggingIn={false}
      isLoggedIn={true}
      isEmailVerified={false}
    />
  );
  expect(element.find("p").text()).toBe("Email should be verified");
});

it("should not render anything if user is logged in and email is verified", () => {
  const element = shallow(
    <AuthChecker
      {...defaultProps}
      isLoggedIn={true}
      isLoggingIn={false}
      isEmailVerified={true}
    />
  );
  expect(element.type()).toBe(null);
});

it("should display login error message if it present", () => {
  const message = "Login error";
  const element = shallow(
    <AuthChecker {...defaultProps} loginErrorMessage={message} />
  );
  expect(element.find("p").text()).toBe(message);
});
