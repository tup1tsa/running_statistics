import { MESSAGES, RegularLoginInfo } from "running_app_core";
import { loginRouteFactory } from "../../application/routes/loginRoute";
import { getRequestReponse } from "./registationRoute.test";

const successValidator = (loginInfo: unknown): loginInfo is RegularLoginInfo =>
  true;
const failedValidator = (loginInfo: unknown): loginInfo is RegularLoginInfo =>
  false;

it("should send 403 status and error message if info is not valid", async done => {
  const { request, response, status, end } = getRequestReponse();
  const factory = loginRouteFactory(failedValidator, jest.fn());
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.userInfoInvalid);
  done();
});

it("should send 403 status and error message if email or password are incorrect", async done => {
  const { request, response, status, end } = getRequestReponse();
  const findUserByPassword = jest.fn().mockResolvedValue(null);
  const factory = loginRouteFactory(successValidator, findUserByPassword);
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.emailPasswordIncorrect);
  done();
});

it("should set cookie and send correct response if user was found", async done => {
  const { request, response, status, end, cookie } = getRequestReponse();
  const user = { name: "bas", accessToken: "some token" };
  const findUserByPassword = jest.fn().mockResolvedValue(user);
  const factory = loginRouteFactory(successValidator, findUserByPassword);
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls[0][0]).toBe(undefined);
  expect(cookie.mock.calls[0][0]).toBe("accessToken");
  expect(cookie.mock.calls[0][1]).toBe("some token");
  expect(cookie.mock.calls[0][2]).toEqual({ maxAge: 30 * 24 * 60 * 60 * 1000 });
  done();
});
