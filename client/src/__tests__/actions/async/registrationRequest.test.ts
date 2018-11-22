import { registrationRequestFactory } from "../../../application/actions/async/registrationRequest";
import { MESSAGES } from "../../../application/common_files/config";

const defaultUserInfo = {
  name: "layla",
  email: "figaba@mail.us",
  password: "gasta25"
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
  expect(dispatch.mock.calls[0][0]).toEqual({ type: "START_REGISTRATION" });
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
  expect(dispatch.mock.calls[1][0]).toEqual({ type: "SUCCESS_REGISTRATION" });
  expect(dispatch.mock.calls[2][0].payload).toEqual({
    args: ["/success"],
    method: "push"
  });
  expect(setMessageUrl.mock.calls.length).toBe(1);
  expect(setMessageUrl.mock.calls[0][0]).toEqual({
    message: MESSAGES[9],
    isError: false
  });
  done();
});

it("should dispatch proper fail message action and not redirect", async done => {
  const networkRequest = jest
    .fn()
    .mockResolvedValue({ status: 500, errorMessage: MESSAGES[0] });
  const dispatch = jest.fn();
  await registrationRequestFactory(networkRequest, jest.fn())(defaultUserInfo)(
    dispatch
  );
  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[1][0]).toEqual({
    type: "FAIL_REGISTRATION",
    error: true,
    payload: new Error(MESSAGES[0])
  });
  done();
});
