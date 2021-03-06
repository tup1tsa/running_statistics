import { MESSAGES } from "running_app_core";
import { registrationRequestFactory } from "../../../application/actions/async/registrationRequest";

const defaultUserInfo = {
  name: "layla",
  email: "figaba@mail.us",
  password: "gasta25",
  passwordConfirmation: "gasta25"
};

it("should call network request with correct data", async done => {
  const networkRequest = jest.fn().mockResolvedValue({});
  await registrationRequestFactory(networkRequest, jest.fn())(defaultUserInfo)(
    jest.fn()
  );
  expect(networkRequest.mock.calls.length).toBe(1);
  expect(networkRequest.mock.calls[0][0]).toBe("/registration");
  expect(networkRequest.mock.calls[0][1]).toBe("post");
  expect(networkRequest.mock.calls[0][2]).toBe(defaultUserInfo);
  done();
});

it("should dispatch start registration action immediately", async () => {
  const dispatch = jest.fn();
  const request = registrationRequestFactory(
    jest.fn().mockResolvedValue({}),
    jest.fn()
  )(defaultUserInfo)(dispatch);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({ type: "REGISTRATION_START" });
  return request;
});

it("should dispatch success registration action on success and redirect", async done => {
  const networkRequest = jest.fn().mockResolvedValue({ status: 200 });
  const dispatch = jest.fn();
  const setMessageUrl = jest.fn().mockReturnValue("/success");
  await registrationRequestFactory(networkRequest, setMessageUrl)(
    defaultUserInfo
  )(dispatch);
  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[1][0]).toEqual({ type: "REGISTRATION_SUCCESS" });
  expect(dispatch.mock.calls[2][0].payload).toEqual({
    args: ["/success"],
    method: "push"
  });
  expect(setMessageUrl.mock.calls.length).toBe(1);
  expect(setMessageUrl.mock.calls[0][0]).toEqual({
    message: "User was registered",
    isError: false
  });
  done();
});

it("should dispatch success error message if it was provided by backend", async done => {
  const networkRequest = jest
    .fn()
    .mockResolvedValue({ status: 200, data: "all is fine" });
  const dispatch = jest.fn();
  const setMessageUrl = jest.fn().mockReturnValue("/success");
  await registrationRequestFactory(networkRequest, setMessageUrl)(
    defaultUserInfo
  )(dispatch);
  expect(setMessageUrl.mock.calls.length).toBe(1);
  expect(setMessageUrl.mock.calls[0][0]).toEqual({
    message: "all is fine",
    isError: false
  });
  done();
});

it("should dispatch proper fail message action and not redirect", async done => {
  const networkRequest = jest.fn().mockResolvedValue({
    status: 500,
    errorMessage: MESSAGES.unexpectectedError
  });
  const dispatch = jest.fn();
  await registrationRequestFactory(networkRequest, jest.fn())(defaultUserInfo)(
    dispatch
  );
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "REGISTRATION_FAIL",
    error: true,
    payload: new Error(MESSAGES.unexpectectedError)
  });
  done();
});
