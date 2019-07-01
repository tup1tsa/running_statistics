import { shallow } from "enzyme";
import firebase from "firebase/app";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { FirebaseLoginFactory } from "../../../application/components/Auth/FirebaseLogin";

const auth = {} as firebase.auth.Auth;
const uiConfig = {} as firebaseui.auth.Config;
const defaultProps = {
  auth,
  uiConfig,
  isLoggedIn: true,
  redirectToMainPage: jest.fn()
};

it("should render firebase auth component and not redirect if not logged in", () => {
  const redirect = jest.fn();
  const wrapper = shallow(
    <FirebaseLoginFactory
      {...defaultProps}
      isLoggedIn={false}
      redirectToMainPage={redirect}
    />
  );
  expect(wrapper.find(StyledFirebaseAuth).length).toBe(1);
  expect(redirect.mock.calls.length).toBe(0);
});

it("should redirect if user is already logged in", () => {
  const redirect = jest.fn();
  shallow(
    <FirebaseLoginFactory
      {...defaultProps}
      isLoggedIn={true}
      redirectToMainPage={redirect}
    />
  );
  expect(redirect.mock.calls.length).toBe(1);
});
