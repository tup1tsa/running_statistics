import { shallow } from "enzyme";
import React from "react";
import { Header } from "../../application/components/Header";

const defaultProps = {
  goToRegistrationPage: jest.fn(),
  goToLoginPage: jest.fn(),
  logout: jest.fn(),

  name: "",
  emailVerified: true,
  isLoggedIn: false,
  photoURL: null,
  isLoggingIn: false
};

it("should render sign in and sign up blue buttons if user is not logged in", () => {
  const goToRegistrationPage = jest.fn();
  const goToLoginPage = jest.fn();
  const element = shallow(
    <Header
      {...defaultProps}
      goToRegistrationPage={goToRegistrationPage}
      goToLoginPage={goToLoginPage}
    />
  );
  expect(element.find("button.blue").length).toBe(2);
  const firstButton = element.find("button.blue").first();
  const lastButton = element.find("button.blue").last();

  expect(firstButton.text()).toBe("Sign up");
  firstButton.simulate("click");
  expect(goToRegistrationPage.mock.calls.length).toBe(1);

  expect(lastButton.text()).toBe("Sign in");
  lastButton.simulate("click");
  expect(goToLoginPage.mock.calls.length).toBe(1);
});

it("should render blue logout button if user is logged in", () => {
  const logout = jest.fn();
  const props = {
    ...defaultProps,
    isLoggedIn: true
  };
  const element = shallow(<Header {...props} logout={logout} />);
  expect(element.find("button.blue").length).toBe(1);
  const button = element.find("button.blue").first();

  expect(button.text()).toBe("Sign out");
  button.simulate("click");
  expect(logout.mock.calls.length).toBe(1);
});

it("should render user name if user is logged in", () => {
  const props = {
    ...defaultProps,
    name: "sasha",
    emailVerified: true,
    isLoggedIn: true
  };
  const wrapper = shallow(<Header {...props} />);
  expect(wrapper.find("span").text()).toBe("sasha");
  expect(wrapper.find("span").props().title).toBe("");
});

it("should render user name* and title if user is logged in, but email is not verified", () => {
  const props = {
    ...defaultProps,
    name: "sasha",
    emailVerified: false,
    isLoggedIn: true
  };
  const wrapper = shallow(<Header {...props} />);
  expect(wrapper.find("span").text()).toBe("sasha*");
  expect(wrapper.find("span").props().title).toBe("Email is not verified");
});

it("should render header container no matter if user is logged in or not", () => {
  const loggedInElement = shallow(<Header {...defaultProps} />);
  expect(loggedInElement.find(".header").length).toBe(1);

  const loggedOutElement = shallow(
    <Header {...defaultProps} isLoggedIn={true} />
  );
  expect(loggedOutElement.find(".header").length).toBe(1);
});

it("should render correct preloader on sign in request", () => {
  const wrapper = shallow(<Header {...defaultProps} isLoggingIn={true} />);
  expect(wrapper.find("span").text()).toBe("Logging in");
  expect(wrapper.find("img").props().src).toBe("/images/loader.gif");
});
