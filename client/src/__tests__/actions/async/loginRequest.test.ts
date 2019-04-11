import { MESSAGES } from "running_app_core";
import { loginRequestFactory } from "../../../application/actions/async/loginRequest";

const defaultUserInfo = {
  email: "figaba@mail.us",
  password: "gasta25"
};

const helpers = {
  networkRequest: jest.fn().mockResolvedValue({}),
  loginViaToken: jest.fn().mockReturnValue(jest.fn())
};

it("should call network request with correct data", async done => {
  const networkRequest = jest.fn().mockResolvedValue({});
  await loginRequestFactory({ ...helpers, networkRequest })(defaultUserInfo)(
    jest.fn()
  );
  expect(networkRequest.mock.calls.length).toBe(1);
  expect(networkRequest.mock.calls[0][0]).toBe("/loginViaPassword");
  expect(networkRequest.mock.calls[0][1]).toBe("post");
  expect(networkRequest.mock.calls[0][2]).toBe(defaultUserInfo);
  done();
});

it("should dispatch start login action immediately", async () => {
  const dispatch = jest.fn();
  const request = loginRequestFactory(helpers)(defaultUserInfo)(dispatch);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0]).toEqual({ type: "LOGIN_START" });
  return request;
});

it("should dispatch login via token action on success", async done => {
  const networkRequest = jest.fn().mockResolvedValue({ status: 200 });
  const loginViaToken = jest.fn().mockReturnValue(jest.fn());
  const dispatch = jest.fn();
  await loginRequestFactory({ ...helpers, networkRequest, loginViaToken })(
    defaultUserInfo
  )(dispatch);
  expect(loginViaToken.mock.calls.length).toBe(1);
  done();
});

it("should dispatch proper fail message action and not redirect", async done => {
  const networkRequest = jest.fn().mockResolvedValue({
    status: 500,
    errorMessage: MESSAGES.unexpectectedError
  });
  const dispatch = jest.fn();
  await loginRequestFactory({ ...helpers, networkRequest })(defaultUserInfo)(
    dispatch
  );
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "LOGIN_FAIL",
    error: true,
    payload: new Error(MESSAGES.unexpectectedError)
  });
  done();
});
