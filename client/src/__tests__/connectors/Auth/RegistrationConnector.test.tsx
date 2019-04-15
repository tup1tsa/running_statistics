import {
  mapDispatchToProps,
  mapStateToProps
} from "../../../application/connectors/Auth/RegistrationConnector";
import { testGlobalState } from "../PathWatcherConnector.test";

it("should dispatch correct state fields", () => {
  const state = testGlobalState();
  expect(mapStateToProps(state)).toEqual({
    name: state.user.name,
    email: state.user.email,
    password: state.registration.passwordFirstInput,
    passwordCopy: state.registration.passwordSecondInput,
    error: state.registration.error,
    inProgress: state.registration.inProgress
  });
});

it("should dispatch correct change registration field prop", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  props.changeName("John");
  props.changeEmail("somma@gmail.com");
  props.changePassword("first pass");
  props.changePasswordConfirmation("second pass");
  expect(dispatch.mock.calls.length).toBe(4);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "CHANGE_REGISTRATION_NAME",
    payload: "John"
  });
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "CHANGE_REGISTRATION_EMAIL",
    payload: "somma@gmail.com"
  });
  expect(dispatch.mock.calls[2][0]).toEqual({
    type: "CHANGE_REGISTRATION_PASSWORD",
    payload: "first pass"
  });
  expect(dispatch.mock.calls[3][0]).toEqual({
    type: "CHANGE_REGISTRATION_PASSWORD_CONFIRMATION",
    payload: "second pass"
  });
});

it("should dispatch correct register dispatch prop", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  const userInfo = {
    name: "soma",
    email: "ba@gmaom.com",
    password: "secret",
    passwordConfirmation: "secret again"
  };
  props.register(userInfo);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "REGISTRATION_START"
  });
});
