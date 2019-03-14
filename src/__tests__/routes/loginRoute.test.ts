import { MESSAGES, RegularLoginInfo } from "running_app_core";
import { loginRouteFactory } from "../../application/routes/loginRoute";
import { getRequestReponse } from "./registationRoute.test";

const successValidator = (loginInfo: unknown): loginInfo is RegularLoginInfo =>
  true;
const failedValidator = (loginInfo: unknown): loginInfo is RegularLoginInfo =>
  false;

it("should send 403 status and error message if info is not valid", async done => {
  const { request, response, status, end } = getRequestReponse();
  const factory = loginRouteFactory(failedValidator, jest.fn(), jest.fn());
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe("email or password is not valid");
  done();
});

it("should send 403 status and error message if email or password are incorrect", async done => {
  const { request, response, status, end } = getRequestReponse();
  const findUserByPassword = jest.fn().mockResolvedValue(null);
  const factory = loginRouteFactory(
    successValidator,
    findUserByPassword,
    jest.fn()
  );
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.emailPasswordIncorrect);
  done();
});

it("should set cookie and send correct response if user was found", async done => {
  const { request, response, status, end } = getRequestReponse();
  const user = { name: "bas", accessToken: "some token" };
  const findUserByPassword = jest.fn().mockResolvedValue(user);
  const setTokenCookies = jest.fn();
  const factory = loginRouteFactory(
    successValidator,
    findUserByPassword,
    setTokenCookies
  );
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls[0][0]).toBe(undefined);
  expect(setTokenCookies.mock.calls.length).toBe(1);
  expect(setTokenCookies.mock.calls[0][0]).toBe(response);
  expect(response.locals.user).toEqual(user);
  done();
});
