import {
  mapDispatchToProps,
  mapStateToProps
} from "../../application/connectors/RegistrationConnector";
import { testGlobalState } from "./PathWatcherContainer.test";

it("should dispatch correct state fields", () => {
  const state = testGlobalState();
  expect(mapStateToProps(state)).toEqual({
    login: state.login,
    email: state.email,
    password: state.passwordFirstInput,
    passwordCopy: state.passwordSecondInput
  });
});

it("should dispatch correct change registration field prop", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  props.changeInput({
    fieldName: "email",
    value: "somma@gmail.com"
  });
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "CHANGE_INPUT",
    payload: {
      fieldName: "email",
      value: "somma@gmail.com"
    }
  });
});

it("should dispatch correct register dispatch prop", () => {
  const dispatch = jest.fn();
  const props = mapDispatchToProps(dispatch);
  const userInfo = { name: "soma", email: "ba@gmaom.com", password: "secret" };
  props.register(userInfo);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({
    type: "START_REGISTRATION"
  });
});
