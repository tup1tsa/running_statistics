import { Request, Response } from "express";
import { MESSAGES, RegularRegistrationInfo } from "running_app_core";
import { registrationRouteFactory } from "../../application/routes/registrationRoute";

const successValidator = (
  userInfo: unknown
): userInfo is RegularRegistrationInfo => true;

export const getRequestReponse = () => {
  const request = {} as Request;
  const response = {} as Response;
  const end = jest.fn();
  const cookie = jest.fn();
  const status = jest.fn().mockReturnValue(response);
  const next = jest.fn();

  request.cookies = {};
  request.body = {};
  response.locals = {};

  response.end = end;
  response.cookie = cookie;
  response.status = status;

  return {
    request,
    response,
    end,
    cookie,
    status,
    next
  };
};

it("should send invalid data error if data is not valid", async done => {
  const { request, response, end, status } = getRequestReponse();
  const validatorMock = jest.fn().mockReturnValue(false);
  await registrationRouteFactory(
    // @ts-ignore
    validatorMock,
    jest.fn(),
    jest.fn()
  )(request, response);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(JSON.stringify(MESSAGES.userInfoInvalid));
  done();
});

it("should send unexpected error if hash user info threw", async done => {
  // it should not happen but just in case
  const { request, response, end, status } = getRequestReponse();
  const hashUserInfo = jest.fn().mockRejectedValue("some error");
  await registrationRouteFactory(successValidator, hashUserInfo, jest.fn())(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(
    JSON.stringify(MESSAGES.unexpectectedError)
  );
  done();
});

it("should send 409 error if user already exists", async done => {
  const { request, response, end, status } = getRequestReponse();
  const saveUser = jest.fn().mockRejectedValue("already exist");
  await registrationRouteFactory(successValidator, jest.fn(), saveUser)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(409);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(JSON.stringify(MESSAGES.userAlreadyExists));
  done();
});

it("user info should be passed to hash method correctly", async done => {
  const { request, response } = getRequestReponse();
  request.body.name = "my name";
  request.body.email = "some@gmail.com";
  request.body.password = "secret";
  const hashInfoMock = jest.fn().mockResolvedValue({ accessToken: "as" });
  await registrationRouteFactory(successValidator, hashInfoMock, jest.fn())(
    request,
    response,
    jest.fn()
  );
  expect(hashInfoMock.mock.calls.length).toBe(1);
  expect(hashInfoMock.mock.calls[0][0]).toEqual({
    name: "my name",
    email: "some@gmail.com",
    password: "secret"
  });
  done();
});

it("should set correct cookie on success registration", async done => {
  const { request, response, end, status, cookie } = getRequestReponse();
  const hashUserInfo = jest.fn().mockReturnValue({ accessToken: "abc32" });
  const saveUser = jest.fn().mockResolvedValue("");
  await registrationRouteFactory(successValidator, hashUserInfo, saveUser)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls[0][0]).toBe(undefined);
  expect(cookie.mock.calls[0][0]).toBe("accessToken");
  expect(cookie.mock.calls[0][1]).toBe("abc32");
  expect(cookie.mock.calls[0][2]).toEqual({ maxAge: 30 * 24 * 60 * 60 * 1000 });
  done();
});
