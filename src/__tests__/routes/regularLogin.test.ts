import { MESSAGES } from "../../../client/src/application/common_files/config";
import { RegularLoginInfo } from "../../../client/src/application/common_files/interfaces";
import { regularLoginFactory } from "../../application/routes/regularLogin";
import { getRequestReponse } from "./regularRegistation.test";

const successValidator = (loginInfo: unknown): loginInfo is RegularLoginInfo =>
  true;
const failedValidator = (loginInfo: unknown): loginInfo is RegularLoginInfo =>
  false;

it("should send 403 status and error message if info is not valid", async done => {
  const { request, response, status, end } = getRequestReponse();
  const factory = regularLoginFactory(failedValidator, jest.fn());
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(MESSAGES[5]);
  done();
});

it("should send 403 status and error message if email or password are incorrect", async done => {
  const { request, response, status, end } = getRequestReponse();
  const findUserByPassword = jest.fn().mockResolvedValue(null);
  const factory = regularLoginFactory(successValidator, findUserByPassword);
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls[0][0]).toBe(MESSAGES[6]);
  done();
});

it("should set cookie and send correct response if user was found", async done => {
  const { request, response, status, end, cookie } = getRequestReponse();
  const user = { name: "bas", accessToken: "some token" };
  const findUserByPassword = jest.fn().mockResolvedValue(user);
  const factory = regularLoginFactory(successValidator, findUserByPassword);
  await factory(request, response, jest.fn());
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls[0][0]).toBe(undefined);
  expect(cookie.mock.calls[0][0]).toBe("accessToken");
  expect(cookie.mock.calls[0][1]).toBe("some token");
  expect(cookie.mock.calls[0][2]).toEqual({ maxAge: 30 * 24 * 60 * 60 * 1000 });
  done();
});
